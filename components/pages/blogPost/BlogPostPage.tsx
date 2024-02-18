import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import Link from 'next/link'

import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { Header } from '@/components/shared/Header'
import ImageBox from '@/components/shared/ImageBox'
import type { BlogPostPayload } from '@/types'

export interface BlogPostPageProps {
  data: BlogPostPayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function BlogPostPage({ data, encodeDataAttribute }: BlogPostPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { coverImage, description, overview, title } = data ?? {}

  return (
    <div>
      {/* <div className="mb-20 space-y-6"> */}
        {/* Header */}
        {/* <Header title={title} description={overview} /> */}

        {/* <div className="rounded-md border">
          {/* Image  */}
          {/* <ImageBox
            data-sanity={encodeDataAttribute?.('coverImage')}
            image={coverImage}
            // @TODO add alt field in schema
            alt=""
            classesWrapper="relative aspect-[16/9]"
          /> */}
        {/* </div> */}

        {/* Description */}
        {/* {description && (
          <CustomPortableText
            paragraphClasses="font-serif max-w-3xl text-xl text-gray-600"
            value={description}
          />
        )} */}
        {JSON.stringify(data)}
      {/* </div> */}
      {/* <div className="absolute left-0 w-screen border-t" /> */}
    </div>
  )
}

export default BlogPostPage
