import { Head, Html, Main, NextScript } from 'next/document'

const themeScript = `
  let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)')

  function updateTheme(theme) {
    theme = theme ?? window.localStorage.theme ?? 'system'

    if (theme === 'dark' || (theme === 'system' && isDarkMode.matches)) {
      document.documentElement.classList.add('dark')
    } else if (theme === 'light' || (theme === 'system' && !isDarkMode.matches)) {
      document.documentElement.classList.remove('dark')
    }

    return theme
  }

  function updateThemeWithoutTransitions(theme) {
    updateTheme(theme)
    document.documentElement.classList.add('[&_*]:!transition-none')
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none')
    }, 0)
  }

  document.documentElement.setAttribute('data-theme', updateTheme())

  new MutationObserver(([{ oldValue }]) => {
    let newValue = document.documentElement.getAttribute('data-theme')
    if (newValue !== oldValue) {
      try {
        window.localStorage.setItem('theme', newValue)
      } catch {}
      updateThemeWithoutTransitions(newValue)
    }
  }).observe(document.documentElement, { attributeFilter: ['data-theme'], attributeOldValue: true })

  isDarkMode.addEventListener('change', () => updateThemeWithoutTransitions())
`

// Same Organization node as www.canopyapi.co (shared @id), so crawlers tie the
// docs to the main site's entity.
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.canopyapi.co/#organization',
  name: 'Canopy API',
  url: 'https://www.canopyapi.co',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.canopyapi.co/logo-dt.png',
    width: 720,
    height: 200,
  },
  image: 'https://www.canopyapi.co/logo-dt.png',
  description:
    'Canopy API provides real-time Amazon product data over REST, GraphQL, and MCP: search, pricing, reviews, best sellers, deals, and category data.',
  email: 'support@canopyapi.co',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'support@canopyapi.co',
    url: 'https://www.canopyapi.co',
  },
  sameAs: [
    'https://github.com/canopy-api',
    'https://www.linkedin.com/company/canopy-api/',
    'https://twitter.com/canopyapi',
  ],
}

export default function Document() {
  return (
    <Html className="w-full overflow-x-clip antialiased [font-feature-settings:'ss01']" lang="en">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, '\\u003c'),
          }}
        />
      </Head>
      <body className="w-full bg-white dark:bg-slate-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
