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
  weight: [ '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-lora",
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bakeprofit.vercel.app'),
  title: {
    default: "BakeProfit - Free Recipe Cost Calculator & Bakery Management Software",
    template: "%s | BakeProfit",
  },
  description: "Free bakery management software for home bakers. Calculate recipe costs, price cakes & cupcakes, track orders, manage inventory. 6 free calculators + Pro features for $6.99/mo.",
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
    title: 'BakeProfit - Free Recipe Cost Calculator & Bakery Management Software',
    description: 'Free bakery management software for home bakers. Calculate recipe costs, price cakes & cupcakes, track orders, manage inventory.',
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
    title: 'BakeProfit - Free Recipe Cost Calculator & Bakery Management Software',
    description: 'Free bakery management software for home bakers. Calculate recipe costs, price cakes & cupcakes, track orders, manage inventory.',
    images: ['/og-image.png'],
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
    <html lang="en">
      <head>
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
        <Toaster />
      </body>
    </html>
  );
}
