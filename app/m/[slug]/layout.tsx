import { Playfair_Display, Lora, Montserrat, Open_Sans, Amatic_SC, Josefin_Sans, Pacifico, Quicksand, Cormorant_Garamond, Space_Grotesk, Inter } from 'next/font/google'

// Load all fonts used by templates
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const cormorantGaramond = Cormorant_Garamond({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
})

const amaticSC = Amatic_SC({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-amatic',
  display: 'swap',
})

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  variable: '--font-josefin',
  display: 'swap',
})

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pacifico',
  display: 'swap',
})

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export default function PublicMenuLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en"
      className={`
        ${playfairDisplay.variable} 
        ${cormorantGaramond.variable}
        ${lora.variable} 
        ${montserrat.variable} 
        ${openSans.variable} 
        ${amaticSC.variable} 
        ${josefinSans.variable} 
        ${pacifico.variable} 
        ${quicksand.variable}
        ${spaceGrotesk.variable}
        ${inter.variable}
      `}
    >
      <body>
        {children}
      </body>
    </html>
  )
}
