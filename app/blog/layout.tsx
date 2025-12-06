import { Metadata } from 'next'
import blogPosts from './blogPostList'
import { generateBlogIndexSchema } from '@/lib/seo-utils'

export const metadata: Metadata = {
    title: 'Bakery Business Blog | Pricing Guides & Home Baker Tips',
    description: 'Free guides for home bakers: How to price cakes, calculate recipe costs, start a home bakery & more. 20+ articles from baking business experts. Updated 2025.',
    keywords: [
        'bakery blog',
        'baking business tips',
        'cake pricing guide',
        'recipe costing',
        'home bakery business',
        'bakery pricing strategies',
        'bakery profit margins',
        'bakery management',
    ],
    openGraph: {
        title: 'Bakery Business Blog - BakeProfit',
        description: 'Expert guides, pricing strategies, and proven tactics to grow your bakery profitably.',
        type: 'website',
        url: 'https://bakeprofit.com/blog',
        siteName: 'BakeProfit',
        images: [
            {
                url: '/og-blog.png',
                width: 1200,
                height: 630,
                alt: 'BakeProfit Blog',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Bakery Business Blog - BakeProfit',
        description: 'Expert guides, pricing strategies, and proven tactics to grow your bakery profitably.',
        images: ['/og-blog.png'],
        creator: '@bakeprofit',
    },
    alternates: {
        canonical: 'https://bakeprofit.com/blog',
    },
}

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const blogIndexSchema = generateBlogIndexSchema(blogPosts)

    return (
        <>
            {/* Blog Collection Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(blogIndexSchema),
                }}
            />
            {children}
        </>
    )
}
