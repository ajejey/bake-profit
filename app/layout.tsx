import type { Metadata } from "next";
import { Spectral, Raleway, Lora } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import { ExitIntentProvider } from "@/components/ExitIntentProvider";

const spectral = Spectral({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-spectral",
  display: 'swap',
});

const raleway = Raleway({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-raleway",
  display: 'swap',
});

const lora = Lora({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-lora",
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bakeprofit.vercel.app'),
  title: {
    default: "BakeProfit | Free Recipe Cost Calculator & Bakery Software for Home Bakers",
    template: "%s | BakeProfit - Bakery Management Software",
  },
  description: "Stop underpricing your baked goods! Free recipe cost calculator + bakery management software. Calculate costs, price cakes correctly, track orders & inventory. Used by 10,000+ home bakers. Start free today.",
  keywords: [
    'bakery management software',
    'recipe cost calculator',
    'cake pricing calculator',
    'home bakery software',
    'baking business tools',
    'recipe costing',
    'bakery profit calculator',
    'cottage food business',
    'bakery inventory management',
    'recipe scaling calculator',
  ],
  authors: [{ name: 'BakeProfit' }],
  creator: 'BakeProfit',
  publisher: 'BakeProfit',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: "7nItEeuNSAIFL_unU4Ai5p-SGizDDaJU8XRYEKdtOgk",
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bakeprofit.vercel.app',
    siteName: 'BakeProfit',
    title: 'BakeProfit | Free Recipe Cost Calculator & Bakery Software',
    description: 'Stop underpricing your baked goods! Free recipe cost calculator + complete bakery management. Calculate costs, price cakes correctly, track orders. Used by 10,000+ home bakers.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BakeProfit - Bakery Management Software',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BakeProfit | Free Recipe Cost Calculator for Home Bakers',
    description: 'Stop underpricing! Free calculator to know your true recipe costs. Price cakes & cupcakes correctly. Used by 10,000+ bakers.',
    images: ['/og-image.png'],
    site: '@bakeprofit',
    creator: '@bakeprofit',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/android-chrome-512x512.png',
      },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" translate="no">
      <head>
        {/* Organization Schema - Enhanced for Knowledge Panel */}
        <Script id="organization-schema" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            '@id': 'https://bakeprofit.vercel.app/#organization',
            name: 'BakeProfit',
            alternateName: 'Bake Profit',
            url: 'https://bakeprofit.vercel.app',
            logo: {
              '@type': 'ImageObject',
              url: 'https://bakeprofit.vercel.app/logo.png',
              width: 512,
              height: 512,
            },
            image: 'https://bakeprofit.vercel.app/og-image.png',
            description: 'Free recipe cost calculator and bakery management software for home bakers. Calculate ingredient costs, price cakes correctly, track orders, and manage inventory.',
            foundingDate: '2024',
            slogan: 'Know Your Costs. Price With Confidence.',
            knowsAbout: [
              'Recipe Cost Calculation',
              'Bakery Management',
              'Cake Pricing',
              'Home Baking Business',
              'Food Cost Analysis',
            ],
            sameAs: [
              'https://twitter.com/bakeprofit',
              'https://facebook.com/bakeprofit',
              'https://instagram.com/bakeprofit',
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'Customer Support',
              email: 'support@bakeprofit.com',
              availableLanguage: ['English'],
            },
          })}
        </Script>

        {/* Website Schema with Sitelinks Search */}
        <Script id="website-schema" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            '@id': 'https://bakeprofit.vercel.app/#website',
            name: 'BakeProfit',
            alternateName: 'Bake Profit',
            url: 'https://bakeprofit.vercel.app',
            description: 'Free recipe cost calculator and bakery management software for home bakers',
            publisher: {
              '@id': 'https://bakeprofit.vercel.app/#organization',
            },
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://bakeprofit.vercel.app/blog?search={search_term_string}',
              },
              'query-input': 'required name=search_term_string',
            },
          })}
        </Script>

        {/* SiteNavigationElement Schema - Helps Google show sitelinks */}
        <Script id="navigation-schema" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: [
              {
                '@type': 'SiteNavigationElement',
                position: 1,
                name: 'Recipe Cost Calculator',
                description: 'Free calculator to calculate recipe ingredient costs and profit margins',
                url: 'https://bakeprofit.vercel.app/tools/recipe-cost-calculator',
              },
              {
                '@type': 'SiteNavigationElement',
                position: 2,
                name: 'Cake Pricing Calculator',
                description: 'Calculate the perfect price for your cakes including all costs',
                url: 'https://bakeprofit.vercel.app/tools/cake-pricing-calculator',
              },
              {
                '@type': 'SiteNavigationElement',
                position: 3,
                name: 'Free Baking Tools',
                description: '6 free calculators for home bakers - no signup required',
                url: 'https://bakeprofit.vercel.app/tools',
              },
              {
                '@type': 'SiteNavigationElement',
                position: 4,
                name: 'Pricing',
                description: 'Free tier and Pro subscription pricing for BakeProfit',
                url: 'https://bakeprofit.vercel.app/pricing',
              },
              {
                '@type': 'SiteNavigationElement',
                position: 5,
                name: 'Blog',
                description: 'Baking business tips, pricing guides, and home bakery advice',
                url: 'https://bakeprofit.vercel.app/blog',
              },
              {
                '@type': 'SiteNavigationElement',
                position: 6,
                name: 'Bakery Management App',
                description: 'Full bakery management software with order tracking and inventory',
                url: 'https://bakeprofit.vercel.app/bakery-business-tool',
              },
            ],
          })}
        </Script>

        {/* SoftwareApplication Schema - For rich results */}
        <Script id="software-schema" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'BakeProfit',
            applicationCategory: 'BusinessApplication',
            applicationSubCategory: 'Bakery Management Software',
            operatingSystem: 'Web Browser, iOS, Android',
            browserRequirements: 'Requires JavaScript. Works offline.',
            softwareVersion: '2.0',
            datePublished: '2025-10-01',
            offers: [
              {
                '@type': 'Offer',
                name: 'Free Tier',
                price: '0',
                priceCurrency: 'USD',
                description: 'Free access to all calculators, 5 recipes, 15 orders/month',
                availability: 'https://schema.org/InStock',
              },
              {
                '@type': 'Offer',
                name: 'Pro Subscription',
                price: '6.99',
                priceCurrency: 'USD',
                priceSpecification: {
                  '@type': 'UnitPriceSpecification',
                  price: '6.99',
                  priceCurrency: 'USD',
                  unitText: 'MONTH',
                  billingDuration: 'P1M',
                },
                description: 'Unlimited recipes, orders, Google Drive sync, priority support',
                availability: 'https://schema.org/InStock',
              },
            ],
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              ratingCount: '1247',
              bestRating: '5',
              worstRating: '1',
            },
            featureList: [
              'Recipe Cost Calculator',
              'Cake Pricing Calculator',
              'Order Management',
              'Inventory Tracking',
              'Customer Management',
              'Profit Analytics',
              'Works Offline',
            ],
            screenshot: 'https://bakeprofit.vercel.app/og-image.png',
            author: {
              '@id': 'https://bakeprofit.vercel.app/#organization',
            },
          })}
        </Script>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PZSZZY8MQQ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PZSZZY8MQQ');
          `}
        </Script>
      </head>
      <body
        className={`${spectral.variable} ${raleway.variable} ${lora.variable} antialiased`}
        style={{ fontFamily: 'var(--font-raleway)' }}
      >
        <AuthProvider>
          <SubscriptionProvider>
            <ExitIntentProvider />
            {children}
          </SubscriptionProvider>
        </AuthProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
