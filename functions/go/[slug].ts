interface Env {
  AFFILIATE_LINKS: KVNamespace;
  ANALYTICS?: AnalyticsEngineDataset;
}

// Cloudflare Pages Function — xử lý /go/:slug redirect tại edge
// Ưu tiên lookup từ KV để admin có thể update link mà không cần rebuild
export const onRequestGet: PagesFunction<Env> = async ({ params, env, request }) => {
  const slug = params.slug as string;

  if (!slug) {
    return new Response('Not found', { status: 404 });
  }

  const destination = await env.AFFILIATE_LINKS?.get(slug);

  if (!destination) {
    return new Response('Not found', { status: 404 });
  }

  // Log click vào Analytics Engine
  if (env.ANALYTICS) {
    env.ANALYTICS.writeDataPoint({
      blobs: [slug, destination, request.headers.get('referer') ?? '', request.headers.get('user-agent') ?? ''],
      doubles: [Date.now()],
      indexes: [slug],
    });
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: destination,
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex',
    },
  });
};
