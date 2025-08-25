import { NextRequest } from 'next/server';
import { getRedisSubscriber } from '~/libs/redis';

type TaskStatusConnection = {
  taskId: string;
  writer: WritableStreamDefaultWriter<Uint8Array>;
  encoder: TextEncoder;
  controller: AbortController;
};

// 使用全局Map临时存储当前实例的连接，但状态通过Redis同步
const connections = new Map<string, TaskStatusConnection[]>();

export async function GET(request: NextRequest) {
  const taskId = request.nextUrl.searchParams.get('taskId');
  console.log("dong taskStatus api GET:", taskId);
  if (!taskId) {
    return new Response('Missing taskId parameter', { status: 400 });
  }

  // 获取Redis订阅者实例
  const subscriber = getRedisSubscriber();

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      const abortController = new AbortController();
      
      const connection: TaskStatusConnection = {
        taskId,
        writer: {
          write: (chunk: Uint8Array) => controller.enqueue(chunk),
        } as WritableStreamDefaultWriter<Uint8Array>,
        encoder,
        controller: abortController,
      };

      if (!connections.has(taskId)) {
        connections.set(taskId, []);
      }
      connections.get(taskId)!.push(connection);

      // 订阅Redis频道
      const channelName = `task_status:${taskId}`;
      subscriber.subscribe(channelName).then(() => {
        console.log(`Subscribed to Redis channel: ${channelName}`);
      }).catch((error) => {
        console.error('Failed to subscribe to Redis channel:', error);
      });

      // 监听Redis消息
      const messageHandler = (channel: string, message: string) => {
        if (channel === channelName) {
          try {
            const sseData = `data: ${message}\n\n`;
            const chunk = encoder.encode(sseData);
            controller.enqueue(chunk);
            
            // 解析消息，如果任务完成则清理订阅
            const parsedMessage = JSON.parse(message);
            if (parsedMessage.status === 1 || parsedMessage.status === -1) {
              setTimeout(() => {
                abortController.abort();
              }, 2000); // 2秒后关闭连接
            }
          } catch (error) {
            console.error('Error processing Redis message:', error);
          }
        }
      };

      subscriber.on('message', messageHandler);

      // 心跳机制
      const heartbeat = setInterval(() => {
        try {
          controller.enqueue(encoder.encode('data: {"type": "heartbeat"}\n\n'));
        } catch (error) {
          clearInterval(heartbeat);
        }
      }, 30000);

      // 清理逻辑
      abortController.signal.addEventListener('abort', () => {
        clearInterval(heartbeat);
        
        // 取消订阅Redis频道
        subscriber.unsubscribe(channelName).then(() => {
          console.log(`Unsubscribed from Redis channel: ${channelName}`);
        }).catch((error) => {
          console.error('Failed to unsubscribe from Redis channel:', error);
        });
        
        // 移除消息监听器
        subscriber.off('message', messageHandler);
        
        // 清理本地连接记录
        const taskConnections = connections.get(taskId);
        if (taskConnections) {
          const index = taskConnections.indexOf(connection);
          if (index > -1) {
            taskConnections.splice(index, 1);
          }
          if (taskConnections.length === 0) {
            connections.delete(taskId);
          }
        }
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Cache-Control',
    },
  });
}

export async function POST(request: NextRequest) {
  // 这个POST端点现在不再直接处理SSE连接
  // 而是通过Redis发布消息，由订阅者接收
  return Response.json({ 
    message: 'This endpoint is deprecated. Use Redis publishTaskUpdate instead.' 
  }, { status: 410 });
}