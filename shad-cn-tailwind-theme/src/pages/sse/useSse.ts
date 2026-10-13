import { useEffect, useState } from 'react';
import { config } from '@/config/config';

export type SseStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export const useSse = (enabled: boolean) => {
  const [status, setStatus] = useState<SseStatus>('disconnected');
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    setStatus('connecting');
    // withCredentials sends the session cookie so the backend can identify the user
    const source = new EventSource(`${config.backendUrl}/sse/connect`, { withCredentials: true });

    source.onopen = () => setStatus('connected');
    source.onerror = () => setStatus('error');
    source.onmessage = event => {
      try {
        const message = JSON.parse(event.data);
        if (typeof message.count === 'number') {
          setCount(message.count);
        }
      } catch {
        // ignore malformed events
      }
    };

    return () => {
      source.close();
      setStatus('disconnected');
    };
  }, [enabled]);

  return { status, count };
};
