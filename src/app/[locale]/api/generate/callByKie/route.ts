import { R2, r2Bucket, storageURL } from "~/libs/R2";
import { getDb } from "~/libs/db";
import { countSticker } from "~/servers/keyValue";
import { v4 as uuidv4 } from 'uuid';
import {countDownUserTimes} from "~/servers/manageUserTimes";

export const POST = async (req: Request) => {
  let json;
  let taskId;
  
  try {
    json = await req.json();
    console.log('KIE.AI callback received:', json);

    const { code, msg, data } = json;

    // 提取 taskId，无论成功失败都需要它来更新数据库
    taskId = data?.taskId;

    if (code !== 200) {
      console.error('KIE.AI generation failed:', { code, msg, taskId });
      
      // 如果有 taskId，更新数据库状态为失败
      if (taskId) {
        try {
          const db = getDb();
          await db.query('UPDATE works SET status=$1, updated_at=now() WHERE task_id=$2', [-1, taskId]);
          console.log('Updated task status to failed for taskId:', taskId);
        } catch (dbError) {
          console.error('Failed to update task status to failed:', dbError);
        }
      }
      
      return Response.json({ error: 'Generation failed', code, msg }, { status: 400 });
    }

    const { info } = data;
    const { originImageUrl, resultImageUrl } = info;

    if (!resultImageUrl) {
      console.error('No result image URL in callback');
      
      // 更新数据库状态为失败
      if (taskId) {
        try {
          const db = getDb();
          await db.query('UPDATE works SET status=$1, updated_at=now() WHERE task_id=$2', [-1, taskId]);
          console.log('Updated task status to failed due to no result image URL for taskId:', taskId);
        } catch (dbError) {
          console.error('Failed to update task status to failed:', dbError);
        }
      }
      
      return Response.json({ error: 'No result image URL' }, { status: 400 });
    }

    let imageContent;
    try {
      imageContent = await fetch(resultImageUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.status}`);
          }
          return response.arrayBuffer();
        })
        .then(Buffer.from);
    } catch (fetchError) {
      console.error('Failed to fetch result image:', fetchError);
      
      // 更新数据库状态为失败
      if (taskId) {
        try {
          const db = getDb();
          await db.query('UPDATE works SET status=$1, updated_at=now() WHERE task_id=$2', [-1, taskId]);
          console.log('Updated task status to failed due to image fetch error for taskId:', taskId);
        } catch (dbError) {
          console.error('Failed to update task status to failed:', dbError);
        }
      }
      
      return Response.json({ error: 'Failed to fetch result image' }, { status: 500 });
    }

    const fileName = `${uuidv4()}.jpg`;
    try {
      await R2.upload({
        Bucket: r2Bucket,
        Key: fileName,
        Body: imageContent,
        ContentType: 'image/jpeg',
      }).promise();
    } catch (uploadError) {
      console.error('Failed to upload image to R2:', uploadError);
      
      // 更新数据库状态为失败
      if (taskId) {
        try {
          const db = getDb();
          await db.query('UPDATE works SET status=$1, updated_at=now() WHERE task_id=$2', [-1, taskId]);
          console.log('Updated task status to failed due to R2 upload error for taskId:', taskId);
        } catch (dbError) {
          console.error('Failed to update task status to failed:', dbError);
        }
      }
      
      return Response.json({ error: 'Failed to upload image' }, { status: 500 });
    }

    const finalImageUrl = `${storageURL}/${fileName}`;

    const db = getDb();
    const results = await db.query('SELECT * FROM works WHERE task_id=$1', [taskId]);
    
    if (results.rows.length > 0) {
      const row = results.rows[0];

      if (row.is_public) {
        await countSticker('countSticker', 1);
      }

      await db.query(
        'UPDATE works SET output_url=$1, status=$2, updated_at=now() WHERE uid=$3',
        [JSON.stringify([finalImageUrl]), 1, row.uid]
      );
      if (process.env.NEXT_PUBLIC_CHECK_GOOGLE_LOGIN != "0") {
        // 减少用户次数
        await countDownUserTimes(row.user_id);
      }
      console.log('Successfully processed KIE.AI callback for task:', taskId);
    } else {
      console.error('No work record found for taskId:', taskId);
    }

    return Response.json({ msg: 'Callback processed successfully' });
    
  } catch (error) {
    console.error('Error processing KIE.AI callback:', error);
    
    // 如果已经提取了taskId，尝试更新状态为失败
    if (taskId) {
      try {
        const db = getDb();
        await db.query('UPDATE works SET status=$1, updated_at=now() WHERE task_id=$2', [-1, taskId]);
        console.log('Updated task status to failed due to unexpected error for taskId:', taskId);
      } catch (fallbackError) {
        console.error('Failed to update status in fallback error handler:', fallbackError);
      }
    }
    
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
};