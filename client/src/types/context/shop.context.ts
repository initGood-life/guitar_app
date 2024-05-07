import { createContext } from 'react';

import { initialFilters } from '@/components/shop/shop_parts/filters.logic';

import type { KeywordSearchProps } from '../shop.types';

export const KeywordSearchContext = createContext<KeywordSearchProps>({
  filters: initialFilters,
  filterByKeyword: () => { },
  resetKeywordFilter: () => { },
});
