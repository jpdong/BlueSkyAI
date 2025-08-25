import { getUserById } from "~/servers/user";
import { checkUserTimes, countDownUserTimes } from "~/servers/manageUserTimes";
import { v4 as uuidv4 } from "uuid";
import { getDb } from "~/libs/db";
import { getLanguage } from "~/servers/language";
import { checkSubscribe } from "~/servers/subscribe";
import { checkSensitiveInputText } from "~/servers/checkInput";

export async function POST(req: Request) {
  try {
    let json = await req.json();
    let textStr = json.textStr;
    let inputImageUrl = json.inputImageUrl;
    let user_id = json.user_id;
    let is_public = json.is_public;

    if (!user_id && process.env.NEXT_PUBLIC_CHECK_GOOGLE_LOGIN != "0") {
      return Response.json({ msg: "Login to continue.", status: 601 });
    }

    // 检查用户在数据库是否存在，不存在则返回需登录
    const resultsUser = await getUserById(user_id);
    if (resultsUser.email == "" && process.env.NEXT_PUBLIC_CHECK_GOOGLE_LOGIN != "0") {
      return Response.json({ msg: "Login to continue.", status: 601 });
    }

    /*const checkSubscribeStatus = await checkSubscribe(user_id);
    
    if (!is_public) {
      // 判断用户是否订阅状态，否则返回错误
      if (!checkSubscribeStatus) {
        return Response.json({ msg: "Pricing to continue.", status: 602 });
      }
    }

    if (!checkSubscribeStatus) {
      const check = await checkUserTimes(user_id);
      if (!check && process.env.NEXT_PUBLIC_CHECK_AVAILABLE_TIME != "0") {
        return Response.json({ msg: "Pricing to continue.", status: 602 });
      }
    }*/

    const checkSensitive = await checkSensitiveInputText(textStr);
    /*if (!checkSensitive) {
      // 敏感词没通过，校验是否订阅
      if (!checkSubscribeStatus) {
        // 未订阅则返回付费再继续
        return Response.json({ msg: "Pricing to continue.", status: 602 });
      } else {
        // 订阅强制设置其为用户私有，不公开
        is_public = false;
      }
    }*/

    const uid = uuidv4();
    const db = getDb();
    const { origin_language } = await getLanguage(textStr);
    
    // 先创建数据记录，状态为处理中
    await db.query("insert into works(uid, input_text, output_url, is_public, status, user_id, revised_text, is_origin, origin_language, current_language, input_image_url) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)", [
      uid,
      textStr,
      "",
      is_public,
      0, // 0表示处理中
      user_id,
      textStr,
      true,
      origin_language,
      origin_language,
      inputImageUrl,
    ]);

    // 调用KIE.AI API
    let taskId;
    try {
      taskId = await generateImage(textStr, inputImageUrl);
      // 将KIE.AI的taskId存储到数据库
      await db.query('UPDATE works SET task_id=$1, updated_at=now() WHERE uid=$2', [taskId, uid]);
    } catch (generateError) {
      console.error('Generate image failed:', generateError);
      // 将任务状态设为失败
      await db.query('UPDATE works SET status=$1, updated_at=now() WHERE uid=$2', [-1, uid]);
      throw generateError; // 重新抛出错误，让外层catch处理
    }
    
    // 需要登录，且需要支付时，才操作该项
    /*if (process.env.NEXT_PUBLIC_CHECK_GOOGLE_LOGIN != "0" && process.env.NEXT_PUBLIC_CHECK_AVAILABLE_TIME != "0" && !checkSubscribeStatus) {
      // 减少用户次数
      await countDownUserTimes(user_id);
    }*/

    const resultInfo = {
      uid: uid,
      taskId: taskId,
    };
    console.info('handleKie resultInfo:', resultInfo);
    return Response.json(resultInfo);
    
  } catch (error) {
    console.error('handleKie error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function generateImage(prompt: string, inputImageUrl: string): Promise<string> {
  const url = 'https://api.kie.ai/api/v1/flux/kontext/generate';

  // 测试环境使用模拟API，生产环境使用真实API
  /*const url = process.env.NODE_ENV === 'development' || process.env.USE_MOCK_KIE === 'true'
    ? `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/mock/kie-generate`
    : 'https://api.kie.ai/api/v1/flux/kontext/generate';*/
  
  // 构建回调URL - 使用完整的域名
  const callbackUrl = `${process.env.WEB_HOOK_URL}/api/generate/callByKie`;
  
  const requestBody = {
    aspectRatio: "1:1", // 适合GTA风格的正方形
    outputFormat: "jpeg",
    promptUpsampling: false,
    model: "flux-kontext-pro",
    safetyTolerance: 2,
    inputImage: inputImageUrl,
    prompt: `Transform this image into GTA (Grand Theft Auto) style artwork. ${prompt}. Apply vibrant colors, neon lighting effects, 80s Miami aesthetic, stylized character design, and cinematic composition typical of GTA art style.`,
    callBackUrl: callbackUrl,
  };

  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.KIE_AI_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log('KIE.AI API response:', data);
    
    if (!response.ok) {
      throw new Error(`KIE.AI API error: ${data.message || 'Unknown error'}`);
    }
    console.log('KIE.AI API response:', data.data.taskId);
    return data.data.taskId;
  } catch (error) {
    console.error('KIE.AI API call failed:', error);
    throw error;
  }
}