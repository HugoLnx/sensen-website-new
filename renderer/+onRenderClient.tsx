import React from 'react'
import { createRoot } from 'react-dom/client'
import type { OnRenderClientAsync } from 'vike/types'
import { Layout } from '@/components/Layout/Layout'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { SettingsProvider } from '@/contexts/SettingsContext'
import '@/index.css'

const onRenderClient: OnRenderClientAsync = async (pageContext) => {
  const { Page } = pageContext

  const page = (
    <LanguageProvider>
      <ThemeProvider>
        <SettingsProvider>
          <Layout>
            <Page />
          </Layout>
        </SettingsProvider>
      </ThemeProvider>
    </LanguageProvider>
  )

  const container = document.getElementById('app')
  if (!container) throw new Error('DOM element #app not found')

  const root = createRoot(container)
  root.render(page)
}

export { onRenderClient }
