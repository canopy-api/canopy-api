const withMarkdoc = require('@markdoc/next.js');

module.exports =
  withMarkdoc(/* config: https://markdoc.io/docs/nextjs#options */)({
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdoc'],
    async redirects() {
      return [
        {
          source: '/contributing/affiliate-programs',
          destination: '/contributing/discounts',
          permanent: true,
        },
      ]
    },
  });
