import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Creating Standard Operating Procedures for Your Bakery | Free SOP Templates | BakeProfit',
  description: 'Complete guide to creating bakery SOPs with free downloadable templates. Learn why SOPs matter, how to write them, train your team, and ensure consistency in your bakery operations.',
  keywords: 'bakery SOP, standard operating procedures, bakery templates, bakery training, food safety procedures, bakery consistency, SOP examples, bakery documentation',
  openGraph: {
    title: 'Creating Standard Operating Procedures for Your Bakery | Free Templates',
    description: 'Step-by-step guide to creating bakery SOPs with free downloadable templates for consistency and quality.',
    type: 'article',
    url: 'https://bakeprofit.com/blog/bakery-sop-guide',
    images: [
      {
        url: 'https://bakeprofit.com/og-bakery-sop.png',
        width: 1200,
        height: 630,
        alt: 'Creating Standard Operating Procedures for Your Bakery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creating Standard Operating Procedures for Your Bakery | Free Templates',
    description: 'Step-by-step guide to creating bakery SOPs with free downloadable templates for consistency and quality.',
  },
  alternates: {
    canonical: 'https://bakeprofit.com/blog/bakery-sop-guide',
  },
}

export default function BakerySOPGuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Creating Standard Operating Procedures for Your Bakery: Complete Guide with Free Templates',
            description: 'Comprehensive guide to creating bakery standard operating procedures (SOPs) including why they matter, step-by-step creation process, training strategies, and free downloadable templates for consistency and quality control.',
            image: 'https://bakeprofit.com/og-bakery-sop.png',
            datePublished: '2025-02-06T00:00:00.000Z',
            dateModified: '2025-02-06T00:00:00.000Z',
            author: {
              '@type': 'Organization',
              name: 'BakeProfit',
              logo: {
                '@type': 'ImageObject',
                url: 'https://bakeprofit.com/logo.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://bakeprofit.com/blog/bakery-sop-guide',
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What are Standard Operating Procedures (SOPs) for bakeries?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Standard Operating Procedures (SOPs) are detailed, step-by-step instructions that outline how specific tasks should be performed in your bakery. Think of them as recipes for running your business—they ensure consistency, quality, and safety across all operations, from baking procedures to customer service.',
                },
              },
              {
                '@type': 'Question',
                name: 'Why do bakeries need SOPs?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'SOPs ensure consistency and quality control, streamline training and onboarding, enhance time management, guarantee compliance with food safety regulations, prepare your business for growth, and allow you to scale without losing quality. They transform your bakery from dependent on you to a system that runs smoothly with or without you.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I create SOPs for my bakery?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Start by identifying critical tasks, document each step in detail, use clear language and visuals, test the SOP with team members, gather feedback and refine, and implement with proper training. Begin with your most repeated tasks like baking your signature items, packaging orders, or opening/closing procedures.',
                },
              },
              {
                '@type': 'Question',
                name: 'What should be included in a bakery SOP?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Every SOP should include: objective (what and why), scope (who it applies to), required materials/equipment, step-by-step instructions with visuals, safety and quality checkpoints, troubleshooting tips, and a review/update log. Keep it practical and actionable.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I train employees using SOPs?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Use a 3-step training approach: 1) Show (demonstrate while explaining), 2) Guide (have them do it with your guidance), 3) Verify (watch them do it independently). Keep SOPs accessible where tasks are performed, not hidden in an office binder. Use checklists for verification.',
                },
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Create Standard Operating Procedures for Your Bakery',
            description: 'Step-by-step guide to creating effective SOPs for your bakery business',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Identify Critical Tasks',
                text: 'List all repeated tasks in your bakery, prioritize by frequency and importance, start with signature products and daily operations.',
              },
              {
                '@type': 'HowToStep',
                name: 'Document Each Step',
                text: 'Write detailed step-by-step instructions, include exact measurements and timings, add photos or diagrams for visual learners.',
              },
              {
                '@type': 'HowToStep',
                name: 'Test and Refine',
                text: 'Have team members follow the SOP, gather feedback on clarity and completeness, refine based on real-world testing.',
              },
              {
                '@type': 'HowToStep',
                name: 'Train Your Team',
                text: 'Demonstrate the procedure, guide employees through it, verify they can perform it independently.',
              },
              {
                '@type': 'HowToStep',
                name: 'Implement and Monitor',
                text: 'Make SOPs easily accessible, monitor compliance with checklists, review and update regularly.',
              },
            ],
          }),
        }}
      />
      {children}
    </>
  )
}
