'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import SoftwareApplicationSchema from '@/components/structured-data/SoftwareApplicationSchema'
import OrganizationSchema from '@/components/structured-data/OrganizationSchema'
import BreadcrumbSchema from '@/components/structured-data/BreadcrumbSchema'
import FAQSchema from '@/components/structured-data/FAQSchema'

export default function BakeryBusinessTool() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to dashboard
    router.push('/bakery-business-tool/dashboard')
  }, [router])

  return (
    <>
      {/* Structured Data for SEO */}
      <SoftwareApplicationSchema
        name="Home Bakery Business Tool"
        description="Free all-in-one bakery business management tool for home bakers. Calculate recipe costs, track orders, manage inventory, and analyze profits - all offline with no login required."
        url={typeof window !== 'undefined' ? window.location.origin + '/bakery-business-tool' : 'https://yourdomain.com/bakery-business-tool'}
        applicationCategory="BusinessApplication"
        operatingSystem="Any"
        offers={{
          price: "0",
          priceCurrency: "USD"
        }}
        featureList={[
          "Recipe Cost Calculator",
          "Order Tracking System",
          "Inventory Management",
          "Pricing Calculator",
          "Business Analytics Dashboard",
          "Data Export/Import",
          "Offline Functionality"
        ]}
      />
      
      <OrganizationSchema
        name="Food Label Maker"
        url={typeof window !== 'undefined' ? window.location.origin : 'https://yourdomain.com'}
        description="Free online tools for food businesses and home bakers"
      />
      
      <BreadcrumbSchema
        items={[
          { name: "Home", url: typeof window !== 'undefined' ? window.location.origin : 'https://yourdomain.com' },
          { name: "Bakery Business Tool", url: typeof window !== 'undefined' ? window.location.origin + '/bakery-business-tool' : 'https://yourdomain.com/bakery-business-tool' }
        ]}
      />
      
      <FAQSchema
        faqs={[
          {
            question: "How do I calculate recipe costs for my bakery?",
            answer: "Use our Recipe Cost Calculator to add ingredients with their costs and quantities. The tool automatically calculates the total recipe cost, cost per serving, and helps you determine profitable pricing."
          },
          {
            question: "Is my bakery business data stored online?",
            answer: "No, all your data is stored locally on your device using browser storage. We don't collect or store any of your information on our servers. Remember to regularly export your data as a backup."
          },
          {
            question: "Can I export my bakery data?",
            answer: "Yes, you can export all your data (recipes, ingredients, orders, inventory) as a JSON file. Use the Export Data button in the sidebar to download your data for backup or transfer."
          },
          {
            question: "How do I price my baked goods for profit?",
            answer: "Our Pricing Calculator helps you determine selling prices based on ingredient costs, labor, overhead, and desired profit margins. It considers all costs to ensure profitable pricing."
          },
          {
            question: "What features are included in the Bakery Business Tool?",
            answer: "The tool includes Recipe Cost Calculator, Order Tracking, Inventory Management, Pricing Calculator, and Business Analytics Dashboard. All features are free and work offline."
          },
          {
            question: "Do I need to create an account to use this tool?",
            answer: "No account needed! The tool works entirely in your browser with no login required. Your data stays on your device for complete privacy."
          },
          {
            question: "Can I use this tool on my mobile device?",
            answer: "Yes, the Bakery Business Tool is fully responsive and works on all devices - desktop, tablet, and mobile phones."
          },
          {
            question: "How do I track ingredient inventory?",
            answer: "Use the Inventory Manager to track ingredient stock levels, set low stock alerts, and generate shopping lists based on upcoming orders."
          }
        ]}
      />

      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    </>
  )
}
