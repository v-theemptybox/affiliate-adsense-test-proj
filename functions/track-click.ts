interface Env {
  ANALYTICS?: AnalyticsEngineDataset;
  CLICK_LOG?: KVNamespace;
}

interface ClickPayload {
  slug: string;
  destination: string;
  referrer?: string;
  ts: number;
}

// Cloudflare Pages Function — nhận click event từ client-side tracking
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  // Chặn request không phải JSON
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    return new Response('Bad Request', { status: 400 });
  }

  let payload: ClickPayload;
  try {
    payload = await request.json<ClickPayload>();
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  const { slug, destination, referrer, ts } = payload;

  if (!slug || !destination) {
    return new Response('Missing fields', { status: 400 });
  }

  if (env.ANALYTICS) {
    env.ANALYTICS.writeDataPoint({
      blobs: [slug, destination, referrer ?? '', request.headers.get('cf-connecting-ip') ?? ''],
      doubles: [ts ?? Date.now()],
      indexes: [slug],
    });
  }

  // Optional: persist raw log to KV (TTL 30 days)
  if (env.CLICK_LOG) {
    const key = `click:${slug}:${ts}`;
    await env.CLICK_LOG.put(key, JSON.stringify(payload), { expirationTtl: 60 * 60 * 24 * 30 });
  }

  return new Response('OK', {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  });
};
