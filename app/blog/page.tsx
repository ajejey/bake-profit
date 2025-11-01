import { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { ArrowRight, Clock, Calendar } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Bakery Business Blog | Tips, Guides & Calculators | BakeProfit',
  description: 'Learn how to price recipes, calculate costs, scale recipes, and grow your bakery business. Free guides and calculators for home bakers.',
  keywords: 'bakery blog, baking business tips, recipe costing, cake pricing, bakery profit',
}

const blogPosts = [
  {
    title: 'How to Calculate Recipe Cost: Complete Guide for Bakers (2025)',
    description: 'Learn the exact formula to calculate recipe costs including ingredients, labor, overhead, and profit margins. Includes free calculator and real examples.',
    slug: 'how-to-calculate-recipe-cost',
    date: 'January 15, 2025',
    readTime: '12 min read',
    category: 'Recipe Costing',
    featured: true,
  },
  {
    title: 'Cake Pricing Formula: How to Price Cakes for Profit (2025)',
    description: 'Learn the exact formula to price cakes profitably. Includes complexity multipliers, tier pricing, delivery fees, and real examples with free calculator.',
    slug: 'how-to-price-cakes',
    date: 'January 15, 2025',
    readTime: '14 min read',
    category: 'Cake Pricing',
    featured: false,
  },
  {
    title: 'How to Start a Home Bakery Business: Complete Guide (2025)',
    description: 'Complete guide to starting a profitable home bakery. Learn legal requirements, equipment needs, pricing strategies, marketing tactics, and systems to succeed.',
    slug: 'how-to-start-home-bakery',
    date: 'January 15, 2025',
    readTime: '18 min read',
    category: 'Home Bakery',
    featured: false,
  },
  {
    title: 'How to Price Cupcakes: Complete Pricing Guide for Bakers (2025)',
    description: 'Learn how to price cupcakes profitably with step-by-step formulas, real examples, specialty pricing, and common mistakes to avoid. Free calculator included.',
    slug: 'how-to-price-cupcakes',
    date: 'January 15, 2025',
    readTime: '15 min read',
    category: 'Cupcake Pricing',
    featured: false,
  },
  {
    title: 'Recipe Cost Calculator: Excel vs Software (Which is Better?)',
    description: 'Compare Excel spreadsheets vs dedicated recipe cost calculator software. Learn the pros, cons, real cost analysis, and when to switch.',
    slug: 'recipe-cost-calculator-comparison',
    date: 'January 20, 2025',
    readTime: '14 min read',
    category: 'Tools & Software',
    featured: true,
  },
  {
    title: '10 Best Recipe Cost Calculators for Home Bakers (2025)',
    description: 'Research-based review of 10 recipe cost calculators. Compare features, pricing, pros & cons of BakeProfit, meez, CakeCost, and more.',
    slug: 'best-recipe-calculators',
    date: 'January 22, 2025',
    readTime: '18 min read',
    category: 'Tools Review',
    featured: true,
  },
  {
    title: 'How to Track Ingredient Costs for Your Home Bakery (2025 Guide)',
    description: 'Learn how to track ingredient costs, handle price fluctuations, reduce waste, and boost bakery profits. Includes 5 tracking methods and automation tips.',
    slug: 'track-ingredient-costs',
    date: 'January 28, 2025',
    readTime: '12 min read',
    category: 'Ingredient Tracking',
    featured: false,
  },
  {
    title: 'Bakery Profit Margins: What\'s Normal and How to Improve Yours (2025)',
    description: 'Learn what profit margins are normal for bakeries, how to calculate yours, and 10 proven strategies to improve profitability. Includes industry benchmarks and real examples.',
    slug: 'bakery-profit-margins',
    date: 'January 28, 2025',
    readTime: '12 min read',
    category: 'Profit Margins',
    featured: false,
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* Header with Mobile Navigation */}
      <Header showBlog={false} showTools />

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Bakery Business Blog
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Learn how to price recipes, calculate costs, and grow your bakery business profitably. 
            Free guides, calculators, and expert tips for home bakers.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {blogPosts.filter(post => post.featured).map((post) => (
        <section key={post.slug} className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Card className="border-2 border-rose-200 bg-gradient-to-br from-rose-50 to-white">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-rose-600 font-semibold mb-2">
                  <span className="px-3 py-1 bg-rose-100 rounded-full">Featured</span>
                  <span>{post.category}</span>
                </div>
                <CardTitle className="text-3xl sm:text-4xl mb-4">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  {post.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </div>
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <Button className="bg-rose-500 hover:bg-rose-600" size="lg">
                    Read Full Guide
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      ))}

      {/* All Posts Grid */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">All Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <Card className="h-full hover:shadow-lg transition-all hover:border-rose-300">
                  <CardHeader>
                    <div className="text-sm text-rose-600 font-semibold mb-2">
                      {post.category}
                    </div>
                    <CardTitle className="text-xl group-hover:text-rose-600 transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription>
                      {post.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-rose-500 to-rose-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Grow Your Bakery Business?
          </h2>
          <p className="text-xl text-rose-100 mb-8">
            Use our free calculators to price recipes, calculate costs, and maximize profits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools">
              <Button size="lg" className="bg-white text-rose-600 hover:bg-rose-50">
                Free Calculators
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/bakery-business-tool">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-rose-600">
                Sign Up Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600">
          <p>© 2025 BakeProfit. All rights reserved. Made with ❤️ for bakers.</p>
        </div>
      </footer>
    </div>
  )
}
