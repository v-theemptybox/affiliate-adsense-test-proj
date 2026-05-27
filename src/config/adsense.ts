export const ADSENSE = {
  publisherId: 'ca-pub-XXXXXXXXXX',
  slots: {
    banner: '1234567890',
    inArticle: '0987654321',
    sidebar: '1122334455',
    multiplex: '5544332211',
  },
  // Chỉ bật ads trên production để tránh invalid clicks trong dev
  enabled: import.meta.env.PROD,
} as const;
