import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import React from 'react'

import { Header } from '@/components/shared/Header'
import type { BlogPagePayload } from '@/types'

export interface BlogPageProps {
  data: BlogPagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function BlogPage({ data, encodeDataAttribute }: BlogPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { overview = [], title = '' } = data ?? {}

  return (
    <div className="space-y-20">
      {/* Header */}
      {title && <Header centered title={title} description={overview} />}
    </div>
  )
}

export default BlogPage
