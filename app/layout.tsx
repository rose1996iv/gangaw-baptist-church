import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const churchName =
  process.env.NEXT_PUBLIC_CHURCH_NAME || 'Grace Baptist Church'
const tagline =
  process.env.NEXT_PUBLIC_CHURCH_TAGLINE || 'A Community of Faith, Hope & Love'

export const metadata: Metadata = {
  title: {
    default: `${churchName} | ${tagline}`,
    template: `%s | ${churchName}`,
  },
  description: `Welcome to ${churchName}. ${tagline}. Join us for worship, community, and spiritual growth.`,
  keywords: ['Baptist church', 'church', 'worship', 'sermons', 'community', 'faith'],
  openGraph: {
    type: 'website',
    siteName: churchName,
    title: `${churchName} | ${tagline}`,
    description: `Welcome to ${churchName}. Join us for worship and community.`,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
