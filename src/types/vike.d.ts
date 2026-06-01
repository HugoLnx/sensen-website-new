import 'vike/types'

declare global {
  namespace Vike {
    interface Config {
      /** Custom property for Open Graph site name (translation key) */
      ogSiteName?: string
      /** Custom property for Page title key */
      titleKey?: string
      /** Custom property for Page description key */
      descriptionKey?: string
      /** Page title (built-in) */
      title?: string | ((pageContext: PageContext) => string)
      /** Page description (built-in) */
      description?: string | ((pageContext: PageContext) => string)
    }
    interface PageContext {
      /** Evaluated page title */
      title?: string
      /** Evaluated page description */
      description?: string
    }
  }
}

export {}
