'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { ArrowRight, Clock, Calendar, Search, X, Sparkles, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Footer from '@/components/layout/Footer'
import blogPosts from './blogPostList'

// Extract unique categories with counts
const getCategories = () => {
  const categories = new Map<string, number>()
  blogPosts.forEach(post => {
    categories.set(post.category, (categories.get(post.category) || 0) + 1)
  })
  return Array.from(categories.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

const readTimeToMinutes = (readTime: string) => {
  const match = readTime.match(/(\d+)/)
  return match ? parseInt(match[0]) : 0
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [readTimeFilter, setReadTimeFilter] = useState<'all' | 'quick' | 'medium' | 'long'>('all')

  const categories = getCategories()
  const featuredPosts = blogPosts.filter(post => post.featured)

  // Filter logic
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch = 
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query)
        if (!matchesSearch) return false
      }

      // Category filter
      if (selectedCategory && post.category !== selectedCategory) {
        return false
      }

      // Read time filter
      if (readTimeFilter !== 'all') {
        const minutes = readTimeToMinutes(post.readTime)
        if (readTimeFilter === 'quick' && minutes > 10) return false
        if (readTimeFilter === 'medium' && (minutes <= 10 || minutes > 18)) return false
        if (readTimeFilter === 'long' && minutes <= 18) return false
      }

      return true
    })
  }, [searchQuery, selectedCategory, readTimeFilter])

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50">
      <Header showBlog={false} showTools />

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-rose-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Bakery Business Blog
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Expert guides, pricing strategies, and proven tactics to grow your bakery profitably. 
              {' '}<span className="text-rose-600 font-semibold">{filteredPosts.length} articles</span> to explore.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search articles by title, topic, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 text-base border-2 border-rose-200 focus:border-rose-400 rounded-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Read Time Filter */}
              <div className="bg-white rounded-lg border border-rose-100 p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-rose-500" />
                  Read Time
                </h3>
                <div className="space-y-2">
                  {[
                    { id: 'all', label: 'All articles' },
                    { id: 'quick', label: '⚡ Quick (≤10 min)' },
                    { id: 'medium', label: '📖 Medium (11-18 min)' },
                    { id: 'long', label: '📚 Deep Dive (19+ min)' },
                  ].map(option => (
                    <button
                      key={option.id}
                      onClick={() => setReadTimeFilter(option.id as 'all' | 'quick' | 'medium' | 'long')}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm ${
                        readTimeFilter === option.id
                          ? 'bg-rose-100 text-rose-700 font-medium'
                          : 'text-gray-700 hover:bg-rose-50'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="bg-white rounded-lg border border-rose-100 p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-rose-500" />
                  Categories
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm ${
                      selectedCategory === null
                        ? 'bg-rose-100 text-rose-700 font-medium'
                        : 'text-gray-700 hover:bg-rose-50'
                    }`}
                  >
                    All categories
                  </button>
                  {categories.map(({ name, count }) => (
                    <button
                      key={name}
                      onClick={() => setSelectedCategory(name)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm flex justify-between items-center ${
                        selectedCategory === name
                          ? 'bg-rose-100 text-rose-700 font-medium'
                          : 'text-gray-700 hover:bg-rose-50'
                      }`}
                    >
                      <span>{name}</span>
                      <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                        {count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(searchQuery || selectedCategory || readTimeFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory(null)
                    setReadTimeFilter('all')
                  }}
                  className="w-full px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-lg border border-rose-200 transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Posts - Only show when no filters applied */}
            {!searchQuery && !selectedCategory && readTimeFilter === 'all' && (
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="h-5 w-5 text-rose-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Featured Articles</h2>
                </div>
                <div className="grid gap-6">
                  {featuredPosts.slice(0, 3).map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                      <Card className="border-2 border-rose-200 bg-gradient-to-br from-rose-50 to-white hover:shadow-xl transition-all hover:border-rose-400 overflow-hidden">
                        <CardHeader>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-semibold">
                              Featured
                            </span>
                            <span className="text-xs text-gray-600 font-medium">{post.category}</span>
                          </div>
                          <CardTitle className="text-2xl group-hover:text-rose-600 transition-colors">
                            {post.title}
                          </CardTitle>
                          <CardDescription className="text-base text-gray-600">
                            {post.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-6 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-rose-500" />
                              {post.readTime}
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-rose-500" />
                              {post.date}
                            </div>
                            <div className="ml-auto">
                              <ArrowRight className="h-4 w-4 text-rose-500 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
                <div className="border-t border-rose-100 mt-8 pt-8" />
              </div>
            )}

            {/* Results Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {searchQuery ? 'Search Results' : 'All Articles'}
              </h2>
              <p className="text-gray-600">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
                {selectedCategory && ` in "${selectedCategory}"`}
                {readTimeFilter !== 'all' && ` • ${readTimeFilter} read time`}
              </p>
            </div>

            {/* Articles Grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((post: typeof blogPosts[0]) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                    <Card className="h-full border border-rose-100 hover:shadow-lg hover:border-rose-300 transition-all bg-white hover:bg-rose-50">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-1 rounded">
                            {post.category}
                          </span>
                          <span className="text-xs text-gray-500">{post.date}</span>
                        </div>
                        <CardTitle className="text-lg group-hover:text-rose-600 transition-colors line-clamp-2">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {post.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="h-4 w-4 text-rose-400" />
                            {post.readTime}
                          </div>
                          <ArrowRight className="h-4 w-4 text-rose-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-rose-50 rounded-lg border border-rose-100">
                <Search className="h-12 w-12 text-rose-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory(null)
                    setReadTimeFilter('all')
                  }}
                  className="text-rose-600 hover:text-rose-700 font-medium text-sm"
                >
                  Clear all filters →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-rose-500 to-rose-600 mt-12">
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
              <Button size="lg" variant="outline" className="border-white text-rose-600 hover:bg-rose-600">
                Sign Up Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
