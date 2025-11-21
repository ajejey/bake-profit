import { Metadata } from 'next'
import blogPosts from './blogPostList'
import { generateBlogIndexSchema } from '@/lib/seo-utils'

export const metadata: Metadata = {
    title: 'Bakery Business Blog - Expert Guides & Pricing Strategies',
    description: 'Expert guides, pricing strategies, and proven tactics to grow your bakery profitably. Learn recipe costing, cake pricing, business planning, and more.',
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
        url: 'https://bakeprofit.vercel.app/blog',
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
        canonical: 'https://bakeprofit.vercel.app/blog',
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
