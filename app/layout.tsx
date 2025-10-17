import type { Metadata } from "next";
import { Spectral, Raleway, Lora } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";

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
  title: "BakeProfit - Recipe Cost Calculator & Bakery Management Software",
  description: "Bakery management software for home bakers. Calculate recipe costs, track orders, manage inventory. Start free forever or upgrade to Pro for $6.99/mo with Google Drive sync.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spectral.variable} ${raleway.variable} ${lora.variable} antialiased`}
        style={{ fontFamily: 'var(--font-raleway)' }}
      >
        <AuthProvider>
          <SubscriptionProvider>
            {children}
          </SubscriptionProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
