// Generates the crawler- and LLM-facing files in public/ from the Markdoc pages:
//   sitemap.xml, llms.txt, llms-full.txt, and a plain-Markdown copy of each page
//   (/examples/python -> /examples/python.md). Runs before `dev` and `build`.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const SITE_URL = 'https://docs.canopyapi.co'
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const pagesDir = path.join(root, 'src/pages')
const publicDir = path.join(root, 'public')
const navigation = JSON.parse(
  fs.readFileSync(path.join(root, 'src/navigation.json'), 'utf8')
)

function readPage(href) {
  let file = path.join(pagesDir, href === '/' ? 'index.md' : `${href}.md`)
  let source = fs.readFileSync(file, 'utf8')
  let match = source.match(/^---\n([\s\S]*?)\n---\n?/)
  if (!match) throw new Error(`Missing frontmatter in ${file}`)
  let frontmatter = {}
  for (let line of match[1].split('\n')) {
    let i = line.indexOf(':')
    if (i > 0) frontmatter[line.slice(0, i).trim()] = line.slice(i + 1).trim()
  }
  if (!frontmatter.title || !frontmatter.description) {
    throw new Error(`${file} needs a title and description`)
  }
  // Markdoc -> plain Markdown: callouts become blockquotes, annotations go.
  let body = source
    .slice(match[0].length)
    .replace(
      /\{% callout[^%]*%\}\n?([\s\S]*?)\{% \/callout %\}/g,
      (_, text) => text.trim().replace(/^/gm, '> ')
    )
    .replace(/\s*\{%[^%]*%\}/g, '')
    // Root-relative links and images only resolve on the site itself.
    .replace(/\]\(\//g, `](${SITE_URL}/`)
    .trim()
  let mdPath = href === '/' ? '/index.md' : `${href}.md`
  return {
    href,
    url: `${SITE_URL}${href}`,
    mdPath,
    mdUrl: `${SITE_URL}${mdPath}`,
    title: frontmatter.title,
    description: frontmatter.description,
    noindex: frontmatter.noindex === 'true',
    markdown: `# ${frontmatter.title}\n\n> ${frontmatter.description}\n\nSource: ${SITE_URL}${href}\n\n${body}\n`,
  }
}

const sections = navigation.map((section) => ({
  title: section.title,
  external: section.links.filter((link) => !link.href.startsWith('/')),
  pages: section.links
    .filter((link) => link.href.startsWith('/'))
    .map((link) => readPage(link.href))
    .filter((page) => !page.noindex),
}))
const pages = sections.flatMap((section) => section.pages)

function write(file, contents) {
  let target = path.join(publicDir, file)
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.writeFileSync(target, contents)
}

for (let page of pages) write(page.mdPath, page.markdown)

write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => `  <url><loc>${page.url}</loc></url>`).join('\n')}
</urlset>
`
)

const intro = `# Canopy API Docs

> Canopy API provides real-time Amazon product data over REST, GraphQL, and MCP: product details, search, pricing, offers, reviews, best sellers, deals, and category data.

Key facts:

- REST base URL: https://rest.canopyapi.co/ (OpenAPI spec served at the same URL)
- GraphQL endpoint: https://graphql.canopyapi.co/ (POST; interactive playground at the same URL)
- Authentication: send your API key in an \`API-KEY\` header or as \`Authorization: Bearer YOUR_API_KEY\`
- API keys: sign up at https://www.canopyapi.co/signin?view=sign_up
- Every docs page is also available as plain Markdown by appending \`.md\` to its URL
`

write(
  'llms.txt',
  `${intro}
${sections
  .filter((section) => section.pages.length + section.external.length > 0)
  .map(
    (section) =>
      `## ${section.title}\n\n${[
        ...section.external.map((link) => `- [${link.title}](${link.href})`),
        ...section.pages.map(
          (page) => `- [${page.title}](${page.mdUrl}): ${page.description}`
        ),
      ].join('\n')}\n`
  )
  .join('\n')}
## Optional

- [Full documentation in one file](${SITE_URL}/llms-full.txt)
- [Canopy API website](https://www.canopyapi.co)
- [Source and examples on GitHub](https://github.com/canopy-api/canopy-api)
`
)

write(
  'llms-full.txt',
  `${intro}\n---\n\n${pages.map((page) => page.markdown).join('\n---\n\n')}`
)

console.log(
  `Generated sitemap.xml, llms.txt, llms-full.txt and ${pages.length} Markdown pages`
)
