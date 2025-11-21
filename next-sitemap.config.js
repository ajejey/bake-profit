/** @type {import('next-sitemap').IConfig} */

// Import blog posts to get accurate dates and priorities
const blogPosts = require('./app/blog/blogPostList.ts').default;

module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://bakeprofit.vercel.app',
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    exclude: [
        '/api/*',
        '/server-sitemap.xml',
        '/bakery-business-tool/*', // Exclude authenticated pages
    ],

    // Generate sitemap for all blog posts with accurate metadata
    additionalPaths: async (config) => {
        const result = [];

        // Add all blog posts with their actual dates
        blogPosts.forEach(post => {
            result.push({
                loc: `/blog/${post.slug}`,
                changefreq: 'weekly',
                priority: post.featured ? 0.9 : 0.8,
                lastmod: new Date(post.date).toISOString(),
            });
        });

        return result;
    },

    transform: async (config, path) => {
        // Skip blog posts as they're handled in additionalPaths
        if (path.startsWith('/blog/') && path !== '/blog') {
            return null;
        }

        // Homepage - highest priority
        if (path === '/') {
            return {
                loc: path,
                changefreq: 'daily',
                priority: 1.0,
                lastmod: new Date().toISOString(),
            };
        }

        // Blog index page
        if (path === '/blog') {
            return {
                loc: path,
                changefreq: 'daily',
                priority: 0.95,
                lastmod: new Date().toISOString(),
            };
        }

        // Other important pages
        const highPriorityPages = ['/pricing', '/features', '/about'];
        if (highPriorityPages.includes(path)) {
            return {
                loc: path,
                changefreq: 'weekly',
                priority: 0.8,
                lastmod: new Date().toISOString(),
            };
        }

        // Default for other pages
        return {
            loc: path,
            changefreq: 'monthly',
            priority: 0.5,
            lastmod: new Date().toISOString(),
        };
    },

    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/bakery-business-tool/',
                    '/_next/',
                    '/admin/',
                ],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: ['/api/', '/bakery-business-tool/'],
            },
            {
                userAgent: 'Bingbot',
                allow: '/',
                disallow: ['/api/', '/bakery-business-tool/'],
            },
        ],
        additionalSitemaps: [
            // Add this if you later create dynamic sitemaps
            // 'https://bakeprofit.vercel.app/server-sitemap.xml',
        ],
    },
};
