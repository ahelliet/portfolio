/**
 * This config is used to set up Sanity Studio that's mounted on the `app/studio/[[...index]]/Studio.tsx` route
 */

import { assist } from '@sanity/assist'
import { dashboardTool } from '@sanity/dashboard'
import { frFRLocale } from '@sanity/locale-fr-fr'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { presentationTool } from 'sanity/presentation'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'

import { apiVersion, dataset, projectId, studioUrl } from '@/sanity/lib/api'
import { locate } from '@/sanity/plugins/locate'
import { pageStructure, singletonPlugin } from '@/sanity/plugins/settings'
import page from '@/sanity/schemas/documents/page'
import project from '@/sanity/schemas/documents/project'
import duration from '@/sanity/schemas/objects/duration'
import milestone from '@/sanity/schemas/objects/milestone'
import timeline from '@/sanity/schemas/objects/timeline'
import home from '@/sanity/schemas/singletons/home'
import settings from '@/sanity/schemas/singletons/settings'

import blogPost from './sanity/schemas/documents/blogPost'
import blog from './sanity/schemas/singletons/blog'
import { PlausibleTool } from './sanity/tools/plausibleTools'

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE ||
  'Next.js Personal Website with Sanity.io'

export default defineConfig({
  basePath: studioUrl,
  projectId: projectId || '',
  dataset: dataset || '',
  title,
  schema: {
    // If you want more content types, you can add them to this array
    types: [
      // Singletons
      home,
      settings,
      blog,
      // Documents
      duration,
      page,
      project,
      blogPost,
      // Objects
      milestone,
      timeline,
    ],
  },
  tools: [
    PlausibleTool()
  ],
  plugins: [
    dashboardTool({ widgets: [] }),
    frFRLocale(),
    assist(),
    deskTool({
      structure: pageStructure([home, settings, blog]),
    }),
    presentationTool({
      locate,
      previewUrl: {
        draftMode: {
          enable: '/api/draft',
        },
      },
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([home.name, settings.name, blog.name]),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
