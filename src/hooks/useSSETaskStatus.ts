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
};

export const useSSETaskStatus = (taskId: string | null, options: UseSSETaskStatusOptions = {}) => {
  const {
    onStatusUpdate,
    onComplete,
    onError,
    timeout = 5 * 60 * 1000, // 5分钟超时
  } = options;
  
  const eventSourceRef = useRef<EventSource | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  const cleanup = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsConnecting(false);
    setConnectionError(null);
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

      timeoutRef.current = setTimeout(() => {
        console.warn('SSE connection timeout for task:', taskId);
        onError?.('连接超时，请重试');
        cleanup();
      }, timeout);

    } catch (error) {
      console.error('Failed to create SSE connection:', error);
      setConnectionError('无法建立连接');
      setIsConnecting(false);
    }
  }, [cleanup, onStatusUpdate, onComplete, onError, timeout]);

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
  };
};