import { NextRequest } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

interface MockKieRequest {
  model: string;
  prompt: string;
  inputImage: string;
  callBackUrl: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: MockKieRequest = await request.json();
    console.log('Mock KIE.AI request received:', body);

    const { callBackUrl, inputImage } = body;
    
    if (!callBackUrl) {
      return Response.json({
        code: 400,
        msg: 'Missing callback_url',
        data: null
      }, { status: 400 });
    }

    // 生成一个模拟的taskId
    const taskId = `mock_task_${uuidv4()}`;

    // 立即返回taskId，模拟KIE.AI的响应格式
    const response = {
      code: 200,
      msg: 'success',
      data: {
        taskId: taskId
      }
    };

    // 5秒后调用callback
    setTimeout(async () => {
      try {
        console.log('Calling callback for mock task:', taskId);
        
        // 模拟成功的callback数据结构
        const callbackData = {
          code: 200,
          msg: 'Generation completed',
          data: {
            taskId: taskId,
            info: {
              originImageUrl: inputImage,
              resultImageUrl: inputImage // 使用输入图片作为输出，节省成本
            }
          }
        };

        // 调用callback URL
        const callbackResponse = await fetch(callBackUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(callbackData),
        });

        if (callbackResponse.ok) {
          console.log('Mock callback sent successfully for task:', taskId);
        } else {
          console.error('Mock callback failed for task:', taskId, callbackResponse.status);
        }
      } catch (error) {
        console.error('Error sending mock callback:', error);
      }
    }, 5000); // 5秒延迟

    return Response.json(response);
    
  } catch (error) {
    console.error('Mock KIE.AI API error:', error);
    return Response.json({
      code: 500,
      msg: 'Internal server error',
      data: null
    }, { status: 500 });
  }
}