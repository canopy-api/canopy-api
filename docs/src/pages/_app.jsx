import Head from 'next/head'
import { useRouter } from 'next/router'
import { slugifyWithCounter } from '@sindresorhus/slugify'

import { Layout } from '@/components/Layout'
import navigation from '@/navigation.json'

import 'focus-visible'
import '@/styles/tailwind.css'

function getNodeText(node) {
  let text = ''
  for (let child of node.children ?? []) {
    if (typeof child === 'string') {
      text += child
    }
    text += getNodeText(child)
  }
  return text
}

function collectHeadings(nodes, slugify = slugifyWithCounter()) {
  let sections = []

  for (let node of nodes) {
    if (node.name === 'h2' || node.name === 'h3') {
      let title = getNodeText(node)
      if (title) {
        let id = slugify(title)
        node.attributes.id = id
        if (node.name === 'h3') {
          if (!sections[sections.length - 1]) {
            throw new Error(
              'Cannot add `h3` to table of contents without a preceding `h2`'
            )
          }
          sections[sections.length - 1].children.push({
            ...node.attributes,
            title,
          })
        } else {
          sections.push({ ...node.attributes, title, children: [] })
        }
      }
    }

    sections.push(...collectHeadings(node.children ?? [], slugify))
  }

  return sections
}

const SITE_URL = 'https://docs.canopyapi.co'
const SITE_NAME = 'Canopy API Docs'
const SOCIAL_IMAGE = 'https://www.canopyapi.co/logo-dt.png'
// Defined in _document.jsx; shared with www.canopyapi.co.
const ORGANIZATION_ID = 'https://www.canopyapi.co/#organization'

function getSection(path) {
  return navigation.find((section) =>
    section.links.some((link) => link.href === path)
  )
}

// Per-page structured data: a TechArticle plus its breadcrumb trail, both tied
// to the site-wide Organization node.
function getPageJsonLd({ path, url, title, headline, description, section }) {
  let website = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    publisher: { '@id': ORGANIZATION_ID },
    inLanguage: 'en',
  }
  let article = {
    '@type': 'TechArticle',
    '@id': `${url}#article`,
    headline,
    name: title,
    ...(description && { description }),
    ...(section && { articleSection: section }),
    url,
    mainEntityOfPage: url,
    isPartOf: { '@id': website['@id'] },
    breadcrumb: { '@id': `${url}#breadcrumb` },
    about: {
      '@type': 'WebAPI',
      name: 'Canopy API',
      description:
        'Real-time Amazon product data over REST, GraphQL, and MCP.',
      url: 'https://www.canopyapi.co',
      documentation: `${SITE_URL}/`,
      provider: { '@id': ORGANIZATION_ID },
    },
    author: { '@id': ORGANIZATION_ID },
    publisher: { '@id': ORGANIZATION_ID },
    image: SOCIAL_IMAGE,
    inLanguage: 'en',
    isAccessibleForFree: true,
  }
  let breadcrumbs = {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Docs', item: `${SITE_URL}/` },
      ...(path === '/'
        ? []
        : [{ '@type': 'ListItem', position: 2, name: title, item: url }]),
    ],
  }
  return {
    '@context': 'https://schema.org',
    '@graph': [website, article, breadcrumbs],
  }
}

export default function App({ Component, pageProps }) {
  let router = useRouter()
  let frontmatter = pageProps.markdoc?.frontmatter
  let title = frontmatter?.title
  let path = router.pathname
  let url = `${SITE_URL}${path}`
  let markdownUrl = `${SITE_URL}${path === '/' ? '/index' : path}.md`

  let pageTitle =
    frontmatter?.pageTitle || (title ? `${title} | ${SITE_NAME}` : SITE_NAME)

  let description = frontmatter?.description
  let noindex = Boolean(frontmatter?.noindex)

  let tableOfContents = pageProps.markdoc?.content
    ? collectHeadings(pageProps.markdoc.content)
    : []

  let jsonLd = title
    ? getPageJsonLd({
        path,
        url,
        title,
        headline: frontmatter.pageTitle || title,
        description,
        section: getSection(path)?.title,
      })
    : null

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        {description && <meta name="description" content={description} />}
        <meta
          name="robots"
          content={
            noindex ? 'noindex, follow' : 'index, follow, max-snippet:-1'
          }
        />
        {title && <link rel="canonical" href={url} />}
        {title && !noindex && (
          <link rel="alternate" type="text/markdown" href={markdownUrl} />
        )}
        <meta property="og:type" content={path === '/' ? 'website' : 'article'} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={pageTitle} />
        {description && (
          <meta property="og:description" content={description} />
        )}
        {title && <meta property="og:url" content={url} />}
        <meta property="og:image" content={SOCIAL_IMAGE} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@canopyapi" />
        <meta name="twitter:title" content={pageTitle} />
        {description && (
          <meta name="twitter:description" content={description} />
        )}
        <meta name="twitter:image" content={SOCIAL_IMAGE} />
        {jsonLd && (
          <script
            key="page-jsonld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
            }}
          />
        )}
      </Head>
      <Layout title={title} tableOfContents={tableOfContents}>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
