import { Badge } from '@/components/ui/badge';
import { SseStatus, useSse } from './useSse';

const STATUS_LABELS: Record<SseStatus, string> = {
  disconnected: 'Disconnected',
  connecting: 'Connecting...',
  connected: 'Connected',
  error: 'Error',
};

const Sse = () => {
  const { status, count } = useSse(true);

  return (
    <div className="border-primary/15 bg-primary/5 max-w-[480px] rounded-xl border px-6 py-5">
      <h2 className="mb-4 font-bold">Live Counter</h2>

      <div className="mb-4 flex items-center gap-2 text-sm">
        <span>Status:</span>
        <Badge variant="outline" className="border-primary text-primary rounded-2xl font-semibold">
          {STATUS_LABELS[status]}
        </Badge>
      </div>

      <p className="text-muted-foreground mb-2 text-sm">Count (increments every 2s)</p>

      <div className="bg-card flex items-center rounded-3xl p-2">
        <div className="bg-primary/10 text-primary flex size-8 items-center justify-center rounded-full font-bold">{count}</div>
      </div>
    </div>
  );
};

export default Sse;
