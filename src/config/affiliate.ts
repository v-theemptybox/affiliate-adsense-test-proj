export const AFFILIATE_NETWORKS = {
  amazon: {
    tag: 'yourtag-20',
    baseUrl: 'https://www.amazon.com',
  },
  shareasale: {
    merchantId: 'XXXXX',
    trackingUrl: 'https://www.shareasale.com/r.cfm',
  },
  cj: {
    publisherId: 'XXXXXXXXX',
  },
  impact: {
    publisherId: 'XXXXX',
  },
} as const;

export const AFFILIATE_DISCLOSURE =
  'HomeNest is reader-supported. When you buy through our links, we may earn a small commission at no extra cost to you.';

// Map slug → destination URL — được dùng bởi /go/[slug] redirect
// Quản lý tập trung ở đây thay vì hard-code rải rác
export const AFFILIATE_LINKS: Record<string, string> = {
  // Robot vacuums
  'roomba-j7-plus':      'https://www.amazon.com/dp/B094NYSWX6?tag=yourtag-20',
  'eufy-robovac-11s':    'https://www.amazon.com/dp/B07GFR2HY4?tag=yourtag-20',
  'shark-ai-ultra':      'https://www.amazon.com/dp/B09M8TTTQL?tag=yourtag-20',
  'roborock-s8-pro-ultra': 'https://www.amazon.com/dp/B0BVF7SL3R?tag=yourtag-20',
  // Air purifiers
  'dyson-purifier-hot-cool': 'https://www.amazon.com/dp/B09S2DW8YM?tag=yourtag-20',
  'levoit-core-300':     'https://www.amazon.com/dp/B08L73QL4V?tag=yourtag-20',
  'coway-airmega-200m':  'https://www.amazon.com/dp/B01728YDQS?tag=yourtag-20',
  'coway-airmega-400s':  'https://www.amazon.com/dp/B07BKRV25G?tag=yourtag-20',
};
