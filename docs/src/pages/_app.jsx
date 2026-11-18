import Head from 'next/head'
import { useRouter } from 'next/router'
import { slugifyWithCounter } from '@sindresorhus/slugify'

import { Layout } from '@/components/Layout'

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
// Defined in _document.jsx; shared with www.canopyapi.co.
const ORGANIZATION_ID = 'https://www.canopyapi.co/#organization'

// Per-page structured data: a TechArticle plus its breadcrumb trail, both tied
// to the site-wide Organization node.
function getPageJsonLd({ path, title, headline, description }) {
  let url = `${SITE_URL}${path === '/' ? '/' : path}`
  let website = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: 'Canopy API Docs',
    publisher: { '@id': ORGANIZATION_ID },
    inLanguage: 'en',
  }
  let article = {
    '@type': 'TechArticle',
    '@id': `${url}#article`,
    headline,
    ...(description && { description }),
    url,
    mainEntityOfPage: url,
    isPartOf: { '@id': website['@id'] },
    author: { '@id': ORGANIZATION_ID },
    publisher: { '@id': ORGANIZATION_ID },
    image: 'https://www.canopyapi.co/logo-dt.png',
    inLanguage: 'en',
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
  let title = pageProps.markdoc?.frontmatter.title

  let pageTitle =
    pageProps.markdoc?.frontmatter.pageTitle ||
    `${pageProps.markdoc?.frontmatter.title} - Docs`

  let description = pageProps.markdoc?.frontmatter.description

  let tableOfContents = pageProps.markdoc?.content
    ? collectHeadings(pageProps.markdoc.content)
    : []

  let jsonLd = title
    ? getPageJsonLd({
        path: router.pathname,
        title,
        headline: pageProps.markdoc?.frontmatter.pageTitle || title,
        description,
      })
    : null

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        {description && <meta name="description" content={description} />}
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
