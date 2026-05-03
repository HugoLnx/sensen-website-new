import React from 'react'
import { renderToString } from 'react-dom/server'
import type { OnRenderHtmlAsync } from 'vike/types'
import { Layout } from '@/components/Layout/Layout'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { SettingsProvider } from '@/contexts/SettingsContext'

const onRenderHtml: OnRenderHtmlAsync = async (pageContext) => {
  const { Page, urlPathname } = pageContext

  const pageHtml = renderToString(
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

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Sensen Games - Jogos Independentes" />
    <title>Sensen Games</title>
  </head>
  <body>
    <div id="app">${pageHtml}</div>
  </body>
</html>`
}

export { onRenderHtml }
