import { previewData } from 'next/headers'
import { redirect } from 'next/navigation'

import { PreviewSuspense } from '../../components/PreviewSuspense'
import { AboutPage } from '../AboutPage'
import { getPageBySlug } from '../queries'
import { AboutPagePreview } from './AboutPagePreview'

export default async function Preview() {
  // If preview mode isn't active, we redirect to the production page
  if (!previewData()) {
    return redirect(`/about`)
  }

  const token = process.env.SANITY_API_WRITE_TOKEN
  //const token = previewData().token || null
  const about = getPageBySlug('about')
  return (
    <PreviewSuspense fallback={<AboutPage page={await about} />}>
      <AboutPagePreview token={token} />
    </PreviewSuspense>
  )
}
