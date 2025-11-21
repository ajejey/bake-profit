/**
 * Script to generate enhanced SEO layouts for all blog posts
 * Run with: node scripts/generate-blog-seo.js
 */

const fs = require('fs');
const path = require('path');

// Import blog posts
const blogPostsPath = path.join(__dirname, '../app/blog/blogPostList.ts');
const blogPostsContent = fs.readFileSync(blogPostsPath, 'utf-8');

// Extract blog posts array (simple parsing)
const blogPostsMatch = blogPostsContent.match(/const blogPosts = \[([\s\S]*?)\]/);
if (!blogPostsMatch) {
    console.error('Could not parse blogPostList.ts');
    process.exit(1);
}

// Parse blog posts (this is a simplified parser)
const blogPosts = eval(`[${blogPostsMatch[1]}]`);

console.log(`Found ${blogPosts.length} blog posts`);

// Generate layout for each blog post
blogPosts.forEach((post) => {
    const layoutPath = path.join(__dirname, `../app/blog/${post.slug}/layout.tsx`);

    // Check if layout already exists
    if (fs.existsSync(layoutPath)) {
        console.log(`✓ Layout already exists for: ${post.slug}`);
        return;
    }

    const layoutContent = `import { Metadata } from 'next'
import { generateBlogPostMetadata, generateArticleSchema, generateBreadcrumbSchema } from '@/lib/seo-utils'

const blogPost = {
  title: '${post.title.replace(/'/g, "\\'")}',
  description: '${post.description.replace(/'/g, "\\'")}',
  slug: '${post.slug}',
  date: '${post.date}',
  readTime: '${post.readTime}',
  category: '${post.category}',
  featured: ${post.featured},
}

export const metadata: Metadata = generateBlogPostMetadata(blogPost)

export default function ${post.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const articleSchema = generateArticleSchema(blogPost)
  const breadcrumbSchema = generateBreadcrumbSchema(blogPost)
  
  return (
    <>
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      
      {children}
    </>
  )
}
`;

    fs.writeFileSync(layoutPath, layoutContent);
    console.log(`✓ Generated layout for: ${post.slug}`);
});

console.log('\n✅ All blog post layouts generated successfully!');
