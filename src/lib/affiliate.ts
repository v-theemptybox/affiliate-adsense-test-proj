import { AFFILIATE_NETWORKS, AFFILIATE_LINKS } from '@/config/affiliate';

export function buildAmazonUrl(asin: string): string {
  return `${AFFILIATE_NETWORKS.amazon.baseUrl}/dp/${asin}?tag=${AFFILIATE_NETWORKS.amazon.tag}`;
}

export function appendAmazonTag(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.searchParams.set('tag', AFFILIATE_NETWORKS.amazon.tag);
    return parsed.toString();
  } catch {
    return url;
  }
}

export function getCloakedUrl(slug: string): string {
  return `/go/${slug}`;
}

export function resolveAffiliateLink(slug: string): string | null {
  return AFFILIATE_LINKS[slug] ?? null;
}

export function isAffiliateSlugValid(slug: string): boolean {
  return slug in AFFILIATE_LINKS;
}
