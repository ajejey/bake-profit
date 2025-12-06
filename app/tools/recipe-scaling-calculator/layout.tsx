import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Recipe Scaling Calculator | Scale Recipes Up or Down',
  description: 'Scale any recipe up or down instantly with our free recipe scaling calculator. Adjust servings, batch sizes, and convert ingredient amounts. Perfect for bakers and home cooks.',
  keywords: 'recipe scaling calculator, scale recipe, recipe converter, batch size calculator, recipe multiplier, double recipe calculator, half recipe calculator, baking calculator',
  openGraph: {
    title: 'Free Recipe Scaling Calculator for Bakers',
    description: 'Scale recipes up or down instantly. Adjust servings and batch sizes with automatic ingredient conversion.',
    type: 'website',
    url: 'https://bakeprofit.com/tools/recipe-scaling-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Recipe Scaling Calculator',
    description: 'Scale any recipe up or down. Free tool for bakers and home cooks.',
  },
  alternates: {
    canonical: 'https://bakeprofit.com/tools/recipe-scaling-calculator',
  },
}

export default function RecipeScalingCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Recipe Scaling Calculator',
            description: 'Free calculator to scale recipes up or down, adjust servings, and convert ingredient amounts automatically.',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Any',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              ratingCount: '1056',
            },
          }),
        }}
      />
      
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How do I scale a recipe?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Divide your desired yield by the original yield to get the scaling factor. Then multiply each ingredient by this factor. For example, to double a recipe (12 to 24), multiply all ingredients by 2.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I scale any recipe?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Most recipes scale well up to 3-4x. Beyond that, you may need to adjust baking time, temperature, or leavening agents. Delicate recipes like soufflés or macarons are harder to scale and may need testing.',
                },
              },
              {
                '@type': 'Question',
                name: 'What about eggs when scaling?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Eggs are tricky because you cannot use partial eggs easily. For small adjustments, beat eggs and measure by weight (1 large egg is approximately 50g). Or round to the nearest whole egg and adjust liquid slightly.',
                },
              },
              {
                '@type': 'Question',
                name: 'Should I scale baking time?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No, do not scale baking time by the same factor. Larger batches need slightly more time (10-20%), smaller batches need slightly less. Always use visual cues and doneness tests rather than relying solely on time.',
                },
              },
            ],
          }),
        }}
      />
      
      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Scale a Recipe',
            description: 'Step-by-step guide to scaling recipes up or down for different batch sizes',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Enter Original Yield',
                text: 'Input the original recipe yield (number of servings or pieces).',
              },
              {
                '@type': 'HowToStep',
                name: 'Set Desired Yield',
                text: 'Enter how many servings or pieces you want to make.',
              },
              {
                '@type': 'HowToStep',
                name: 'Add Ingredients',
                text: 'Type each ingredient with amount, unit, and name (e.g., "2 cups flour").',
              },
              {
                '@type': 'HowToStep',
                name: 'View Scaled Amounts',
                text: 'The calculator automatically scales all ingredients to your desired yield.',
              },
              {
                '@type': 'HowToStep',
                name: 'Adjust Baking Time',
                text: 'Remember to adjust baking time: larger batches need 10-20% more time, smaller batches need 10-20% less.',
              },
            ],
          }),
        }}
      />
      
      {children}
    </>
  )
}
