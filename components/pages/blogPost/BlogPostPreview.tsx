'use client'

import { type QueryResponseInitial } from '@sanity/react-loader'

import { blogPostBySlugQuery } from '@/sanity/lib/queries'
import { useQuery } from '@/sanity/loader/useQuery'
import { BlogPostPayload } from '@/types'

import BlogPostPage from './BlogPostPage'

type Props = {
  params: { slug: string }
  initial: QueryResponseInitial<BlogPostPayload | null>
}

export default function BlogPostPreview(props: Props) {
  const { params, initial } = props
  const { data, encodeDataAttribute } = useQuery<BlogPostPayload | null>(
    blogPostBySlugQuery,
    params,
    { initial },
  )

  return <BlogPostPage data={data!} encodeDataAttribute={encodeDataAttribute} />
}
