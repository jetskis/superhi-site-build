import { json } from 'react-router'
import { useLoaderData, useMatches, useFetcher, useFetchers } from '@remix-run/react'

export const loader = async ({ params, context, request }) => {
  return json({
    product: {
      title: `Bundle ${params.handle}`,
      price: {
        amount: '120.00',
        currencyCode: 'USD'
      }
    }
  })
}

export default function BundleHandle() {
  const { handle, product, selectedVariant } = useLoaderData()
  const orderable = true
  return (
    <div>
      We may get to bundles or extend this in a later lesson
    </div>
  )
}