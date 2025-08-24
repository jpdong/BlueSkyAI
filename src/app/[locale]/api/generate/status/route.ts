import { getDb } from "~/libs/db";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const uid = url.searchParams.get('uid');

  if (!uid) {
    return Response.json({ error: 'Missing uid parameter' }, { status: 400 });
  }

  try {
    const db = getDb();
    const results = await db.query('SELECT * FROM works WHERE uid = $1', [uid]);
    
    if (results.rows.length === 0) {
      return Response.json({ error: 'Task not found' }, { status: 404 });
    }

    const work = results.rows[0];
    
    return Response.json({
      uid: work.uid,
      status: work.status, // 0: 处理中, 1: 完成, -1: 失败
      outputUrl: work.output_url,
      inputText: work.input_text,
      inputImageUrl: work.input_image_url,
      createdAt: work.created_at,
      updatedAt: work.updated_at,
    });
    
  } catch (error) {
    console.error('Status check error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}