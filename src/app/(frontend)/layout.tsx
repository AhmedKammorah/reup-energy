import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import './globals.css'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config: configPromise })
  const landing = await payload.findGlobal({ slug: 'landing-page', depth: 0 }).catch(() => null)

  return {
    title: landing?.metaTitle ?? 'ReUP — Power on Demand. For the Sea.',
    description:
      landing?.metaDescription ??
      'ReUP delivers fast, reliable on-demand power to yachts at harbor. Marine-grade mobile charging, dispatched to your berth.',
  }
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Outfit:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
