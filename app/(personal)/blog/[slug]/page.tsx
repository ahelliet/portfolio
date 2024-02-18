import { toPlainText } from '@portabletext/react'
import { Metadata, ResolvingMetadata } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { BlogPostPage } from '@/components/pages/blogPost/BlogPostPage'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { loadBlogPost } from '@/sanity/loader/loadQuery'
const BlogPostPreview = dynamic(
  () => import('@/components/pages/blogPost/BlogPostPreview'),
)

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { data: blogPost } = await loadBlogPost(params.slug)
  const ogImage = urlForOpenGraphImage(blogPost?.coverImage)

  return {
    title: blogPost?.title,
    description: blogPost?.overview
      ? toPlainText(blogPost.overview)
      : (await parent).description,
    openGraph: ogImage
      ? {
          images: [ogImage, ...((await parent).openGraph?.images || [])],
        }
      : {},
  }
}

export function generateStaticParams() {
  return generateStaticSlugs('blogPosts')
}

export default async function BlogPostSlugRoute({ params }: Props) {
  const initial = await loadBlogPost(params.slug)

  if (draftMode().isEnabled) {
    return <BlogPostPreview params={params} initial={initial} />
  }

  if (!initial.data) {
    notFound()
  }

  return <BlogPostPage data={initial.data} />
}
