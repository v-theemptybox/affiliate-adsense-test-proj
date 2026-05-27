import { SITE } from '@/config/site';

export function trackAffiliateClick(slug: string, destination: string): void {
  if (typeof window === 'undefined') return;

  // Google Analytics 4
  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', 'affiliate_click', {
      event_category: 'Affiliate',
      event_label: slug,
      destination_url: destination,
    });
  }

  // Gửi đến Cloudflare Function để log server-side
  navigator.sendBeacon(
    '/track-click',
    JSON.stringify({ slug, destination, referrer: document.referrer, ts: Date.now() }),
  );
}

export function trackPageView(path: string): void {
  if (typeof window === 'undefined') return;
  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('config', SITE.googleAnalyticsId, { page_path: path });
  }
}

export function injectGA(measurementId: string): string {
  return `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}', { anonymize_ip: true });
  `;
}
