import { MetadataRoute } from 'next'
import blogPostList from './blog/blogPostList'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bakeprofit.vercel.app'
  
  const blogSlugs = blogPostList.map((post) => post.slug)

  // Static pages
  const routes = [
    '',
    '/bakery-business-tool',
    '/tools',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Calculator pages
  const calculators = [
    '/tools/recipe-cost-calculator',
    '/tools/cake-pricing-calculator',
    '/tools/recipe-scaling-calculator',
    '/tools/bakery-profit-calculator',
    '/tools/ingredient-cost-calculator',
    '/tools/batch-cost-calculator',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  // Blog posts
  const blogPosts = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date('2025-01-15'),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...routes, ...calculators, ...blogPosts]
}
