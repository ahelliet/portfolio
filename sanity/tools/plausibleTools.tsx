import { IconReportAnalytics } from '@tabler/icons-react'
import type { ComponentType } from 'react'
import { type Tool } from 'sanity'

import { assertValue } from '../lib/api'

export interface PlausibleToolOptions {
    customString?: string
}

export interface PlausibleToolProps<Options = any> {
    component: ComponentType<{
        tool: Tool<PlausibleToolOptions>
    }>
}

export const src = assertValue(
    `${process.env.NEXT_PUBLIC_PLAUSIBLE_WIDGET_URL}&embed=true&theme=system`,
    'Missing environment variable: NEXT_PUBLIC_PLAUSIBLE_WIDGET_URL',
  )

export const PlausibleTool = (options: PlausibleToolOptions | void) => {

    const height = 'calc(100vh - 143px)'

    return {
        title: 'Analytics',
        name: 'plausible',
        icon: IconReportAnalytics,
        component: () => (
            <>
                <iframe
                    src={src}
                    loading="lazy"
                    style={{
                        width: '100%',
                        minWidth: 'calc(100% - 1px)',
                        height: height,
                        border: 'none',
                        verticalAlign: 'middle',
                    }}
                />
                <script async src="https://plausible.io/js/embed.host.js" />
            </>
        ),
    }
}