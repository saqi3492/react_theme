import { useEffect, useRef, useState } from 'react';
import { config } from '@/config/config';

export const useSse = enabled => {
  const [status, setStatus] = useState('disconnected');
  const [count, setCount] = useState(0);
  const sourceRef = useRef(null);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const source = new EventSource(`${config.backendUrl}/sse/connect`, {
      withCredentials: true,
    });
    sourceRef.current = source;

    source.onopen = () => setStatus('connected');

    source.onerror = () => {
      setStatus('error');
    };

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
      sourceRef.current = null;
      setStatus('disconnected');
    };
  }, [enabled]);

  return { status, count };
};
