import { useEffect, useRef, useCallback, useState } from 'react';

type TaskStatus = {
  status: number;
  data?: any;
  error?: string;
};

type UseSSETaskStatusOptions = {
  onStatusUpdate?: (status: TaskStatus) => void;
  onComplete?: (data: any) => void;
  onError?: (error: string) => void;
  timeout?: number;
  fallbackPollingDelay?: number; // SSE无响应后开始轮询的延迟时间
  pollingInterval?: number; // 轮询间隔
  maxPollingAttempts?: number; // 最大轮询次数
};

export const useSSETaskStatus = (taskId: string | null, options: UseSSETaskStatusOptions = {}) => {
  const {
    onStatusUpdate,
    onComplete,
    onError,
    timeout = 5 * 60 * 1000, // 5分钟超时
    fallbackPollingDelay = 10 * 1000, // 15秒后开始轮询
    pollingInterval = 20 * 1000, // 1分钟轮询间隔
    maxPollingAttempts = 5, // 最多轮询5次
  } = options;
  
  const eventSourceRef = useRef<EventSource | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fallbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const pollingAttemptsRef = useRef(0);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const [pollingAttempts, setPollingAttempts] = useState(0);

  const cleanup = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (fallbackTimeoutRef.current) {
      clearTimeout(fallbackTimeoutRef.current);
      fallbackTimeoutRef.current = null;
    }
    if (pollingIntervalRef.current) {
      clearTimeout(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    pollingAttemptsRef.current = 0;
    setIsConnecting(false);
    setConnectionError(null);
    setIsPolling(false);
    setPollingAttempts(0);
  }, []);

  const connect = useCallback((taskId: string) => {
    cleanup();
    setIsConnecting(true);
    setConnectionError(null);

    try {
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
      console.log('dong useSSETaskStatus:', baseUrl);
      const eventSource = new EventSource(`${baseUrl}/api/sse/task-status?taskId=${taskId}`);
      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        console.log('SSE connection opened for task:', taskId);
        setIsConnecting(false);
      };

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === 'heartbeat') {
            return;
          }
          
          if (data.type === 'status_update') {
            // 清除兜底计时器，因为SSE正常工作
            if (fallbackTimeoutRef.current) {
              clearTimeout(fallbackTimeoutRef.current);
              fallbackTimeoutRef.current = null;
            }
            
            const status: TaskStatus = {
              status: data.status,
              data: data.data,
            };
            
            onStatusUpdate?.(status);
            
            if (data.status === 1) {
              onComplete?.(data.data);
              cleanup();
            } else if (data.status === -1) {
              onError?.(data.data?.error || '任务失败');
              cleanup();
            }
          }
        } catch (error) {
          console.error('Error parsing SSE data:', error);
        }
      };

      eventSource.onerror = (error) => {
        console.error('SSE connection error:', error);
        setConnectionError('连接错误');
        setIsConnecting(false);
        
        if (eventSource.readyState === EventSource.CLOSED) {
          cleanup();
        }
      };

      // 设置总超时
      timeoutRef.current = setTimeout(() => {
        console.warn('SSE connection timeout for task:', taskId);
        onError?.('任务超时，请重试');
        cleanup();
      }, timeout);
      
      // 设置兜底轮询计时器
      fallbackTimeoutRef.current = setTimeout(() => {
        console.log('在', fallbackPollingDelay / 1000, '秒后开始轮询兜底，SSE无响应');
        startPolling(taskId);
      }, fallbackPollingDelay);

    } catch (error) {
      console.error('Failed to create SSE connection:', error);
      setConnectionError('无法建立连接');
      setIsConnecting(false);
      // SSE失败时立即开始轮询
      startPolling(taskId);
    }
  }, [cleanup, onStatusUpdate, onComplete, onError, timeout]);

  const startPolling = useCallback((taskId: string) => {
    console.log('开始轮询兜底机制');
    setIsPolling(true);
    pollingAttemptsRef.current = 0;
    setPollingAttempts(0);
    
    const poll = async () => {
      try {
        pollingAttemptsRef.current++;
        setPollingAttempts(pollingAttemptsRef.current);
        
        console.log(`轮询第${pollingAttemptsRef.current}次，检查任务状态:`, taskId);
        
        const response = await fetch(`/api/generate/status?uid=${taskId}`);
        const result = await response.json();
        
        if (result.status === 1) {
          // 完成
          console.log('轮询检测到任务完成');
          const outputUrls = JSON.parse(result.outputUrl || '[]');
          onComplete?.({ outputUrls });
          cleanup();
          return;
        } else if (result.status === -1) {
          // 失败
          console.log('轮询检测到任务失败');
          onError?.('任务处理失败');
          cleanup();
          return;
        }
        
        // 检查是否超过最大轮询次数
        if (pollingAttemptsRef.current >= maxPollingAttempts) {
          console.log('轮询达到最大次数，停止轮询');
          onError?.('任务处理超时，请稍后再试或联系客服');
          cleanup();
          return;
        }
        
        // 继续轮询
        pollingIntervalRef.current = setTimeout(poll, pollingInterval);
        
      } catch (error) {
        console.error('轮询错误:', error);
        if (pollingAttemptsRef.current >= maxPollingAttempts) {
          onError?.('网络错误，请检查网络连接');
          cleanup();
        } else {
          // 继续重试
          pollingIntervalRef.current = setTimeout(poll, pollingInterval);
        }
      }
    };
    
    // 立即开始第一次轮询
    poll();
  }, [onComplete, onError, maxPollingAttempts, pollingInterval, cleanup]);

  const disconnect = useCallback(() => {
    cleanup();
  }, [cleanup]);

  useEffect(() => {
    if (taskId) {
      connect(taskId);
    } else {
      cleanup();
    }

    return cleanup;
  }, [taskId, connect, cleanup]);

  return {
    connect,
    disconnect,
    isConnecting,
    connectionError,
    isPolling,
    pollingAttempts,
  };
};