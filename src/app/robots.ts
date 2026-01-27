import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    // todo: change 域名
    sitemap: 'https://xinranliu.com/sitemap.xml',
  }
}
