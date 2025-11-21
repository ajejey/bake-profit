import { Metadata } from 'next'

interface BlogPost {
    title: string
    description: string
    slug: string
    date: string
    readTime: string
    category: string
    featured: boolean
}

/**
 * Generate comprehensive SEO metadata for blog posts
 */
export function generateBlogPostMetadata(post: BlogPost): Metadata {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bakeprofit.vercel.app'
    const blogUrl = `${siteUrl}/blog/${post.slug}`

    return {
        title: post.title,
        description: post.description,
        keywords: [
            ...post.title.toLowerCase().split(' '),
            ...post.category.toLowerCase().split(' '),
            'bakery',
            'home bakery',
            'baking business',
            'recipe costing',
            'cake pricing',
        ],
        authors: [{ name: 'BakeProfit' }],
        openGraph: {
            title: post.title,
            description: post.description,
            type: 'article',
            url: blogUrl,
            siteName: 'BakeProfit',
            publishedTime: new Date(post.date).toISOString(),
            modifiedTime: new Date(post.date).toISOString(),
            authors: ['BakeProfit'],
            tags: [post.category, 'bakery', 'baking business'],
            images: [
                {
                    url: `${siteUrl}/og-blog-${post.slug}.png`,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.description,
            images: [`${siteUrl}/og-blog-${post.slug}.png`],
            creator: '@bakeprofit',
        },
        alternates: {
            canonical: blogUrl,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    }
}

/**
 * Generate Article schema for blog posts
 */
export function generateArticleSchema(post: BlogPost) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bakeprofit.vercel.app'

    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.description,
        author: {
            '@type': 'Organization',
            name: 'BakeProfit',
            url: siteUrl,
        },
        publisher: {
            '@type': 'Organization',
            name: 'BakeProfit',
            logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/logo.png`,
            },
        },
        datePublished: new Date(post.date).toISOString(),
        dateModified: new Date(post.date).toISOString(),
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${siteUrl}/blog/${post.slug}`,
        },
        image: `${siteUrl}/og-blog-${post.slug}.png`,
        articleSection: post.category,
        keywords: [post.category, 'bakery', 'baking business', 'recipe costing'],
    }
}

/**
 * Generate BreadcrumbList schema for blog posts
 */
export function generateBreadcrumbSchema(post: BlogPost) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bakeprofit.vercel.app'

    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: siteUrl,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: `${siteUrl}/blog`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: post.title,
                item: `${siteUrl}/blog/${post.slug}`,
            },
        ],
    }
}

/**
 * Generate CollectionPage schema for blog index
 */
export function generateBlogIndexSchema(posts: BlogPost[]) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bakeprofit.vercel.app'

    return {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Bakery Business Blog - BakeProfit',
        description: 'Expert guides, pricing strategies, and proven tactics to grow your bakery profitably.',
        url: `${siteUrl}/blog`,
        publisher: {
            '@type': 'Organization',
            name: 'BakeProfit',
            logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/logo.png`,
            },
        },
        mainEntity: {
            '@type': 'ItemList',
            itemListElement: posts.slice(0, 10).map((post, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: `${siteUrl}/blog/${post.slug}`,
                name: post.title,
            })),
        },
    }
}

/**
 * Generate Organization schema for the site
 */
export function generateOrganizationSchema() {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bakeprofit.vercel.app'

    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'BakeProfit',
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        description: 'Free bakery management software for home bakers. Calculate recipe costs, price cakes & cupcakes, track orders, manage inventory.',
        sameAs: [
            // Add your social media URLs here
            'https://twitter.com/bakeprofit',
            'https://facebook.com/bakeprofit',
            'https://instagram.com/bakeprofit',
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Support',
            email: 'support@bakeprofit.com',
        },
    }
}

/**
 * Generate WebSite schema with search action
 */
export function generateWebsiteSchema() {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bakeprofit.vercel.app'

    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'BakeProfit',
        url: siteUrl,
        description: 'Free bakery management software for home bakers',
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${siteUrl}/blog?search={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    }
}
