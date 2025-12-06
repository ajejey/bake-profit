import { MetadataRoute } from 'next'
import blogPostList from './blog/blogPostList'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bakeprofit.com'
  
  const blogSlugs = blogPostList.map((post) => post.slug)

  // Core pages - highest priority
  const corePages = [
    { route: '', priority: 1.0 },
    { route: '/tools', priority: 0.95 },
    { route: '/pricing', priority: 0.9 },
    { route: '/blog', priority: 0.85 },
    { route: '/bakery-business-tool', priority: 0.8 },
    { route: '/login', priority: 0.5 },
    { route: '/signup', priority: 0.5 },
  ].map(({ route, priority }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority,
  }))

  // Calculator pages - high priority (main traffic drivers)
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

  return [...corePages, ...calculators, ...blogPosts]
}
