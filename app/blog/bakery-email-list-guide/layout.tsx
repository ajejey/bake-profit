import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Create a Bakery Email List (And What to Send) - Complete Guide',
  description: 'Learn how to build an email list for your bakery business from scratch. Includes free tools, lead magnet ideas, email templates, and proven strategies to get repeat customers.',
  keywords: 'bakery email list, email marketing for bakers, bakery newsletter, email list building, home bakery marketing, customer retention, email templates',
  openGraph: {
    title: 'How to Create a Bakery Email List (And What to Send) - Complete Guide',
    description: 'Learn how to build an email list for your bakery business from scratch. Includes free tools, lead magnet ideas, and email templates.',
    type: 'article',
    publishedTime: '2025-02-06T00:00:00.000Z',
    authors: ['BakeProfit Team'],
    tags: ['Email Marketing', 'Customer Retention', 'Marketing Strategy'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Create a Bakery Email List (And What to Send)',
    description: 'Build an email list for your bakery with free tools, lead magnets, and proven strategies.',
  },
  alternates: {
    canonical: 'https://bakeprofit.com/blog/bakery-email-list-guide',
  },
}

export default function BakeryEmailListLayout({
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
            headline: 'How to Create a Bakery Email List (And What to Send) - Complete Guide',
            description: 'Learn how to build an email list for your bakery business from scratch. Includes free tools, lead magnet ideas, email templates, and proven strategies to get repeat customers.',
            image: 'https://bakeprofit.com/og-bakery-email-list.png',
            datePublished: '2025-02-06T00:00:00.000Z',
            dateModified: '2025-02-06T00:00:00.000Z',
            author: {
              '@type': 'Organization',
              name: 'BakeProfit',
            },
            publisher: {
              '@type': 'Organization',
              name: 'BakeProfit',
              logo: {
                '@type': 'ImageObject',
                url: 'https://bakeprofit.com/logo.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://bakeprofit.com/blog/bakery-email-list-guide',
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
                name: 'How much does it cost to start an email list for my bakery?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'You can start completely free. Tools like Mailchimp (free up to 500 contacts), MailerLite (free up to 1,000 contacts), and Sender (free up to 2,500 contacts) offer generous free plans. You only pay when you grow beyond these limits.',
                },
              },
              {
                '@type': 'Question',
                name: 'How often should I email my bakery customers?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Start with 2-4 emails per month (weekly or bi-weekly). This keeps you top-of-mind without overwhelming subscribers. Increase frequency during busy seasons (holidays, wedding season) and decrease during slow periods.',
                },
              },
              {
                '@type': 'Question',
                name: 'What should I send in my bakery newsletter?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Send: 1) New product announcements, 2) Weekly/monthly specials, 3) Availability updates, 4) Behind-the-scenes content, 5) Customer spotlights, 6) Seasonal offerings, 7) Ordering reminders, and 8) Exclusive VIP offers. Mix promotional and valuable content.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I get customers to join my email list?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Offer a lead magnet (10% off first order, free recipe guide, VIP early access). Add signup forms to your website, Instagram bio, Facebook page, and include a card with every order. Make the benefit clear: "Join for exclusive specials and early ordering."',
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
            name: 'How to Build a Bakery Email List',
            description: 'Step-by-step guide to creating and growing an email list for your bakery business',
            totalTime: 'P1D',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Choose an Email Marketing Platform',
                text: 'Select a free email marketing tool like Mailchimp, MailerLite, or Sender. Sign up and verify your account.',
              },
              {
                '@type': 'HowToStep',
                name: 'Create a Lead Magnet',
                text: 'Offer something valuable in exchange for email addresses: 10% off coupon, free recipe guide, VIP early access, or exclusive content.',
              },
              {
                '@type': 'HowToStep',
                name: 'Set Up Signup Forms',
                text: 'Add email signup forms to your website, Instagram bio link, Facebook page, and create physical signup cards for in-person orders.',
              },
              {
                '@type': 'HowToStep',
                name: 'Send Welcome Email',
                text: 'Create an automated welcome email that delivers your lead magnet and introduces your bakery. Set expectations for email frequency.',
              },
              {
                '@type': 'HowToStep',
                name: 'Plan Your Content Calendar',
                text: 'Schedule 2-4 emails per month with a mix of promotions, new products, availability updates, and valuable content.',
              },
            ],
          }),
        }}
      />
      {children}
    </>
  )
}
