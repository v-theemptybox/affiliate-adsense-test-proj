import type { APIRoute } from 'astro';
import { resolveAffiliateLink } from '@/lib/affiliate';

// SSR route — không prerender, chạy trên Cloudflare edge
export const prerender = false;

export const GET: APIRoute = async ({ params, redirect }) => {
  const slug = params.slug as string;
  const destination = resolveAffiliateLink(slug);

  if (!destination) {
    return new Response('Not found', { status: 404 });
  }

  // Cache-Control: không cache redirect để tracking luôn chạy
  return redirect(destination, 302);
};
