import algoliasearch from 'algoliasearch';

export const algoliaClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APP_ID,
  import.meta.env.VITE_ALGOLIA_ADMIN_KEY,
);

export const productIndex = algoliaClient.initIndex('products');

void productIndex.setSettings({
  searchableAttributes: ['unordered(model)'],
  advancedSyntax: true,
}).wait();
