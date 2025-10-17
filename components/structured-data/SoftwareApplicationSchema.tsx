import React from 'react'

interface SoftwareApplicationSchemaProps {
  name: string
  description: string
  url: string
  applicationCategory: string
  operatingSystem: string
  offers: {
    price: string
    priceCurrency: string
  }
  featureList: string[]
}

export default function SoftwareApplicationSchema({
  name,
  description,
  url,
  applicationCategory,
  operatingSystem,
  offers,
  featureList,
}: SoftwareApplicationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    applicationCategory,
    operatingSystem,
    offers: {
      '@type': 'Offer',
      price: offers.price,
      priceCurrency: offers.priceCurrency,
    },
    featureList,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
