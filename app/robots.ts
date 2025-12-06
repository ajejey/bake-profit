import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/bakery-business-tool/settings'],
    },
    sitemap: 'https://bakeprofit.com/sitemap.xml',
  }
}
