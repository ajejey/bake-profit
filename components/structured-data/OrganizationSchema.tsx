import React from 'react'

interface OrganizationSchemaProps {
  name: string
  url: string
  description: string
}

export default function OrganizationSchema({
  name,
  url,
  description,
}: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    description,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
