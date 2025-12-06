'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, ChevronRight, ChevronDown } from 'lucide-react'

interface BusinessPlanData {
  [key: string]: string | number
}

export default function BusinessPlanTemplate() {
  const [formData, setFormData] = useState<BusinessPlanData>({})
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['executive-summary']))

  const sections = [
    {
      id: 'executive-summary',
      title: '1. Executive Summary',
      description: 'A high-level overview of your bakery business',
      fields: [
        { id: 'businessName', label: 'Business Name', type: 'text', placeholder: 'e.g., Sweet Dreams Bakery' },
        { id: 'mission', label: 'Mission Statement', type: 'textarea', placeholder: 'What is the purpose of your bakery? What value do you provide to customers?' },
        { id: 'productsSummary', label: 'Products & Services Summary', type: 'textarea', placeholder: 'Brief overview of what you\'ll sell (e.g., custom cakes, cookies, bread)' },
        { id: 'targetMarket', label: 'Target Market', type: 'textarea', placeholder: 'Who are your ideal customers? (e.g., busy parents, wedding planners, local businesses)' },
        { id: 'startupCosts', label: 'Startup Costs ($)', type: 'number', placeholder: '500' },
        { id: 'revenueGoal', label: 'First Year Revenue Goal ($)', type: 'number', placeholder: '15000' },
      ]
    },
    {
      id: 'business-description',
      title: '2. Business Description',
      description: 'Detailed information about your bakery',
      fields: [
        { id: 'structure', label: 'Business Structure', type: 'select', options: ['Sole Proprietorship', 'LLC', 'Partnership'] },
        { id: 'location', label: 'Location', type: 'text', placeholder: 'City, State' },
        { id: 'hours', label: 'Operating Hours', type: 'textarea', placeholder: 'e.g., Orders accepted Mon-Fri, Pickup Sat-Sun' },
        { id: 'unique', label: 'What Makes You Unique?', type: 'textarea', placeholder: 'What sets your bakery apart from competitors?' },
        { id: 'values', label: 'Brand Values', type: 'textarea', placeholder: 'What does your brand stand for? (e.g., quality, sustainability, creativity)' },
      ]
    },
    {
      id: 'products',
      title: '3. Products & Services',
      description: 'What you\'ll sell and how you\'ll price it',
      fields: [
        { id: 'coreProducts', label: 'Core Products', type: 'textarea', placeholder: 'List your main products:\n• Custom Birthday Cakes\n• Cookies (6 varieties)\n• Cupcakes' },
        { id: 'pricingStrategy', label: 'Pricing Strategy', type: 'textarea', placeholder: 'How will you price? (e.g., Cost × 2.5, Market-based pricing)' },
        { id: 'priceExamples', label: 'Product Examples with Prices', type: 'textarea', placeholder: 'Chocolate Chip Cookies: $40/dozen\nCustom Cake (8-inch): $120\nCupcakes: $36/dozen' },
      ]
    },
    {
      id: 'market-analysis',
      title: '4. Market Analysis',
      description: 'Understanding your market and competition',
      fields: [
        { id: 'demographics', label: 'Target Customer Demographics', type: 'textarea', placeholder: 'Age: 25-45\nIncome: $50k+\nLocation: Within 10 miles\nPreferences: Quality over price' },
        { id: 'marketSize', label: 'Market Size', type: 'textarea', placeholder: 'Estimated potential customers in your area' },
        { id: 'competitors', label: 'Main Competitors', type: 'textarea', placeholder: 'List 3-5 competitors:\n1. Local Bakery A - Specializes in wedding cakes, $$$\n2. Grocery Store Bakery - Mass market, $' },
        { id: 'advantage', label: 'Your Competitive Advantage', type: 'textarea', placeholder: 'Why will customers choose you? (e.g., personalization, quality ingredients, unique flavors)' },
      ]
    },
    {
      id: 'marketing',
      title: '5. Marketing & Sales Strategy',
      description: 'How you\'ll attract and retain customers',
      fields: [
        { id: 'channels', label: 'Marketing Channels', type: 'textarea', placeholder: 'Instagram, Facebook, Farmers Markets, Word-of-Mouth, Local Events' },
        { id: 'socialMedia', label: 'Social Media Strategy', type: 'textarea', placeholder: 'Post 3x/week: Product photos, behind-the-scenes, customer testimonials' },
        { id: 'acquisition', label: 'Customer Acquisition Plan', type: 'textarea', placeholder: 'First 10 customers: Friends/family, local Facebook groups, farmers market booth' },
        { id: 'retention', label: 'Customer Retention Strategy', type: 'textarea', placeholder: 'Email list, loyalty discounts, seasonal promotions, excellent service' },
      ]
    },
    {
      id: 'operations',
      title: '6. Operations Plan',
      description: 'Day-to-day running of your bakery',
      fields: [
        { id: 'schedule', label: 'Production Schedule', type: 'textarea', placeholder: 'Baking: Tuesday-Thursday evenings\nDelivery/Pickup: Friday-Saturday' },
        { id: 'orderProcess', label: 'Order Process', type: 'textarea', placeholder: 'Orders via Instagram DM or website form\n48-hour minimum notice\nPayment via Venmo/Cash' },
        { id: 'delivery', label: 'Delivery/Pickup Options', type: 'textarea', placeholder: 'Home pickup (free), Local delivery ($5), Farmers market booth' },
        { id: 'equipment', label: 'Equipment Needed', type: 'textarea', placeholder: 'Have: Oven, mixer, pans\nNeed: Stand mixer ($300), Extra pans ($50)' },
      ]
    },
    {
      id: 'financial',
      title: '7. Financial Plan',
      description: 'Costs, pricing, and revenue projections',
      fields: [
        { id: 'startupBreakdown', label: 'Startup Costs Breakdown', type: 'textarea', placeholder: 'Cottage Food License: $100\nPackaging Supplies: $150\nInitial Ingredients: $200\nMarketing Materials: $50\nTotal: $500' },
        { id: 'fixedCosts', label: 'Monthly Fixed Costs', type: 'textarea', placeholder: 'Insurance: $40\nWebsite Hosting: $25\nBakeProfit Pro: $7\nMarketing: $50\nTotal: $122/month' },
        { id: 'variableCost', label: 'Average Variable Cost Per Unit ($)', type: 'number', placeholder: '20' },
        { id: 'avgPrice', label: 'Average Selling Price ($)', type: 'number', placeholder: '75' },
        { id: 'monthlySales', label: 'Monthly Sales Goal (Units)', type: 'number', placeholder: '12' },
        { id: 'breakEven', label: 'Break-Even Point (Units/Month)', type: 'number', placeholder: '3' },
      ]
    },
    {
      id: 'goals',
      title: '8. Goals & Milestones',
      description: 'Your roadmap to success',
      fields: [
        { id: 'goals3Month', label: '3-Month Goals', type: 'textarea', placeholder: '• Obtain cottage food license\n• Make first 10 sales\n• Reach break-even point\n• Build Instagram to 100 followers' },
        { id: 'goals6Month', label: '6-Month Goals', type: 'textarea', placeholder: '• 20 sales per month\n• Email list of 50 subscribers\n• Add 2nd product line\n• Consistent $1,000/month revenue' },
        { id: 'goals1Year', label: '1-Year Goals', type: 'textarea', placeholder: '• $15,000 total revenue\n• 30 sales per month\n• Hire part-time help\n• Upgrade equipment' },
        { id: 'vision3Year', label: '3-Year Vision', type: 'textarea', placeholder: 'Where do you see your bakery? (e.g., Full-time income, commercial kitchen, multiple product lines)' },
      ]
    }
  ]

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId)
    } else {
      newExpanded.add(sectionId)
    }
    setExpandedSections(newExpanded)
  }

  const handleInputChange = (fieldId: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }))
  }

  const downloadAsText = () => {
    let content = '═══════════════════════════════════════════════════════\n'
    content += '           HOME BAKERY BUSINESS PLAN\n'
    content += '═══════════════════════════════════════════════════════\n\n'

    sections.forEach(section => {
      content += `\n${'='.repeat(60)}\n`
      content += `${section.title.toUpperCase()}\n`
      content += `${'='.repeat(60)}\n\n`

      section.fields.forEach(field => {
        const value = formData[field.id] || '[To be completed]'
        content += `${field.label}:\n`
        content += `${'-'.repeat(field.label.length + 1)}\n`
        content += `${value}\n\n`
      })
    })

    content += '\n═══════════════════════════════════════════════════════\n'
    content += '  Created with BakeProfit Business Plan Template\n'
    content += '  https://bakeprofit.com\n'
    content += '═══════════════════════════════════════════════════════\n'

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${formData.businessName || 'My-Bakery'}-Business-Plan.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const progress = Object.keys(formData).length
  const totalFields = sections.reduce((acc, section) => acc + section.fields.length, 0)
  const progressPercent = Math.round((progress / totalFields) * 100)

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <Card className="mb-6 bg-gradient-to-r from-rose-50 to-pink-50 border-rose-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">Progress: {progress}/{totalFields} fields completed</span>
            <span className="text-sm font-bold text-rose-600">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-rose-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Download Button */}
      {progress > 0 && (
        <div className="mb-6 text-center">
          <Button 
            onClick={downloadAsText}
            className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-6 text-lg"
          >
            <Download className="mr-2 h-5 w-5" />
            Download Your Business Plan
          </Button>
          <p className="text-sm text-gray-600 mt-2">Downloads as a formatted text file you can edit</p>
        </div>
      )}

      {/* Form Sections */}
      <div className="space-y-4">
        {sections.map((section) => {
          const isExpanded = expandedSections.has(section.id)
          const sectionProgress = section.fields.filter(f => formData[f.id]).length
          const sectionTotal = section.fields.length

          return (
            <Card key={section.id} className="border-2">
              <CardHeader 
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {isExpanded ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                    <div>
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-gray-600">
                    {sectionProgress}/{sectionTotal}
                  </div>
                </div>
              </CardHeader>

              {isExpanded && (
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {section.fields.map((field) => (
                      <div key={field.id}>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {field.label}
                        </label>
                        {field.type === 'textarea' ? (
                          <textarea
                            value={formData[field.id] || ''}
                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                            placeholder={field.placeholder}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-rose-500 focus:outline-none min-h-[100px]"
                          />
                        ) : field.type === 'select' ? (
                          <select
                            value={formData[field.id] || ''}
                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-rose-500 focus:outline-none"
                          >
                            <option value="">Select...</option>
                            {field.options?.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={field.type}
                            value={formData[field.id] || ''}
                            onChange={(e) => handleInputChange(field.id, field.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value)}
                            placeholder={field.placeholder}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-rose-500 focus:outline-none"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>

      {/* Bottom Download Button */}
      {progress > 0 && (
        <div className="mt-8 text-center pb-8">
          <Button 
            onClick={downloadAsText}
            className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-6 text-lg"
          >
            <Download className="mr-2 h-5 w-5" />
            Download Your Business Plan
          </Button>
          <p className="text-sm text-gray-600 mt-2">Save your progress anytime!</p>
        </div>
      )}
    </div>
  )
}
