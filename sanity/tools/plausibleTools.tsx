import { IconReportAnalytics } from '@tabler/icons-react'
import type { ComponentType } from 'react'
import { type Tool } from 'sanity'

export interface PlausibleToolOptions {
    customString?: string
}

export interface PlausibleToolProps<Options = any> {
    component: ComponentType<{
        tool: Tool<PlausibleToolOptions>
    }>
}

export const PlausibleTool = (options: PlausibleToolOptions | void) => {

    const url = 'https://plausible.io/share/my-ah-portfolio.vercel.app?auth=XuM6J4bUqpRzv22_K2g9l'
    const height = 'calc(100vh - 143px)'

    return {
        title: 'Analytics',
        name: 'plausible',
        icon: IconReportAnalytics,
        component: () => (
            <>
                <iframe
                    src={`${url}&embed=true&theme=system`}
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