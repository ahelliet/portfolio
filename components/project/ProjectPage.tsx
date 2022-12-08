import { PortableText } from '@portabletext/react'
import { Header } from 'components/Header'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { ProjectPayload } from 'types'

export function ProjectPage({
  data,
  preview,
}: {
  data: ProjectPayload
  preview?: boolean
}) {
  if (!data && !preview) {
    notFound()
  }

  // Default to an empty object to allow previews on non-existent documents
  const {
    client,
    coverImage,
    description,
    duration,
    overview,
    site,
    tags,
    title,
  } = data || {}

  const startYear = new Date(duration?.start).getFullYear()
  const endYear = duration?.end ? new Date(duration?.end).getFullYear() : 'Now'

  const imageUrl =
    coverImage &&
    urlForImage(coverImage)?.height(2000).width(3500).fit('crop').url()

  return (
    <div>
      <Header title={title} description={overview} />

      <div className="grid grid-cols-4 rounded-md border">
        <div className="col-span-4">
          {imageUrl ? (
            <Image
              className="h-auto w-full rounded-md"
              alt={`Cover image for ${title}`}
              width={3500}
              height={2000}
              sizes="100vw"
              src={imageUrl}
            />
          ) : (
            <div className="bg-gray-200" style={{ paddingTop: '50%' }} />
          )}
        </div>

        <div className="border-r p-4">
          <div className="text-sm">Duration</div>
          {Boolean(startYear && endYear) && (
            <div className="text-lg">{`${startYear} -  ${endYear}`}</div>
          )}
        </div>

        <div className="border-r p-4 text-lg">
          <div className="text-sm">Client</div>
          <div>{client}</div>
        </div>

        <div className="border-r p-4">
          <div className="text-sm">Site</div>
          {site && (
            <Link target="_blank" className="break-words text-lg" href={site}>
              {site}
            </Link>
          )}
        </div>

        <div className="p-4">
          <div className="text-sm">Tags</div>
          <div className="flex flex-row flex-wrap text-lg">
            {tags?.map((tag, key) => (
              <div key={key} className="mr-1 break-words ">
                #{tag}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="py-12 font-serif text-gray-600">
        <PortableText value={description} />
      </div>
    </div>
  )
}
