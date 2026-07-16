import { db } from '@/server/db/client';
import { formatSseEvent } from '@/server/lib/stamp';
import { StampService } from '@/server/service/stamp.service';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const merchantId = url.searchParams.get('merchantId') ?? '';

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const svc = new StampService(db);
        const events = await svc.listEvents(merchantId, 10);
        const sse = formatSseEvent({ type: 'recent', events });
        controller.enqueue(encoder.encode(sse));
        // Heartbeat
        controller.enqueue(encoder.encode(': heartbeat\n\n'));
      } catch (e) {
        controller.enqueue(encoder.encode(formatSseEvent({ type: 'error', message: String(e) })));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
