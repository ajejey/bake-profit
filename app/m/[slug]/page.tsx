import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import connectDB from '@/lib/db/mongodb'
import PublicMenu from '@/lib/db/models/PublicMenu'
import MenuRenderer from '@/app/bakery-business-tool/components/storefront/MenuRenderer'
import type { PublicMenu as PublicMenuType } from '@/app/bakery-business-tool/types'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Fetch menu data
async function getMenu(slug: string): Promise<PublicMenuType | null> {
  try {
    await connectDB()
    
    // Use .lean() to get plain JavaScript objects instead of Mongoose documents
    const menu = await PublicMenu.findOne({ 
      slug: slug.toLowerCase(),
      isPublished: true,
    }).lean() as any
    
    if (!menu) {
      return null
    }

    // Increment view count (fire and forget)
    PublicMenu.updateOne(
      { _id: menu._id },
      { $inc: { viewCount: 1 } }
    ).exec()

    // Convert to plain object with defaults for missing fields
    // Ensure all nested objects are plain JavaScript objects
    const branding = menu.branding ? JSON.parse(JSON.stringify(menu.branding)) : { businessName: 'Menu' }
    const contactInfo = menu.contactInfo ? JSON.parse(JSON.stringify(menu.contactInfo)) : {}
    const products = Array.isArray(menu.products) ? JSON.parse(JSON.stringify(menu.products)) : []
    const categories = Array.isArray(menu.categories) ? JSON.parse(JSON.stringify(menu.categories)) : []

    return {
      id: menu._id.toString(),
      userId: menu.userId,
      slug: menu.slug,
      branding,
      templateId: menu.templateId || 'elegant-floral',
      products,
      categories,
      contactInfo,
      showPrices: menu.showPrices ?? true,
      showContactInfo: menu.showContactInfo ?? true,
      orderFormEnabled: menu.orderFormEnabled ?? false,
      acceptingOrders: menu.acceptingOrders ?? false,
      orderLeadDays: menu.orderLeadDays,
      isPublished: menu.isPublished ?? false,
      publishedAt: menu.publishedAt ? new Date(menu.publishedAt).toISOString() : undefined,
      viewCount: menu.viewCount || 0,
      createdAt: new Date(menu.createdAt).toISOString(),
      updatedAt: new Date(menu.updatedAt).toISOString(),
    }
  } catch (error) {
    console.error('Error fetching menu:', error)
    return null
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const menu = await getMenu(slug)
  
  if (!menu || !menu.branding) {
    return {
      title: 'Menu Not Found | BakeProfit',
    }
  }

  const businessName = menu.branding?.businessName || 'Menu'
  const title = `${businessName} Menu`
  const description = menu.branding?.tagline 
    ? `${menu.branding.tagline} - View our menu and place an order.`
    : `View the menu from ${businessName} and place an order.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://bakeprofit.vercel.app/m/${menu.slug}`,
      siteName: 'BakeProfit',
      images: menu.branding?.logo ? [
        {
          url: menu.branding.logo,
          width: 400,
          height: 400,
          alt: businessName,
        }
      ] : undefined,
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: menu.branding?.logo ? [menu.branding.logo] : undefined,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function PublicMenuPage({ params }: PageProps) {
  const { slug } = await params
  const menu = await getMenu(slug)
  
  if (!menu) {
    notFound()
  }

  return <MenuRenderer menu={menu} />
}
