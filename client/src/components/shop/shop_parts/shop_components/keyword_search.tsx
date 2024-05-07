import ResetKeyIcon from '@icons/close_icon.svg?react';
import SearchIcon from '@icons/dashboard_icons/search.svg?react';
import type { ChangeEvent, JSX } from 'react';
import { useContext } from 'react';

import { KeywordSearchContext } from '@/types/context/shop.context';

const KeywordSearch = (): JSX.Element => {
  const {
    filterByKeyword, resetKeywordFilter, filters,
  } = useContext(KeywordSearchContext);
  const { keyword, triggeredFilters } = filters;
  const debouncedFilterByKeyword = (keywords: string) => filterByKeyword(keywords);

  const handleFilterByKeyword = ({ target }: ChangeEvent<HTMLInputElement>) => {
    debouncedFilterByKeyword(target.value);
  };

  return (
    <div className="relative w-full">
      <input
        type="search"
        placeholder="Search Model..."
        name="keyword_search"
        value={keyword}
        onChange={handleFilterByKeyword}
        className="block h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-lg text-gray-900 caret-gray-900 ring-gray-600 placeholder:text-lg placeholder:text-gray-500 focus:border-gray-600 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-900"
      />
      {triggeredFilters.keywordState ? (
        <ResetKeyIcon
          onClick={resetKeywordFilter}
          className="absolute right-4 top-2 size-8 cursor-pointer rounded-md fill-gray-900 transition-all duration-150 ease-in hover:bg-gray-500 hover:fill-white"
        />
      ) : (
        <SearchIcon className="pointer-events-none absolute right-4 top-2 size-8 rounded-md fill-gray-500" />
      )}
    </div>
  );
};

export default KeywordSearch;
