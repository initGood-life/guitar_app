import {
  AnimatePresence, LayoutGroup, motion,
} from 'framer-motion';
import type { JSX } from 'react';
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';

import { useScrollOnTop } from '@/custom/custom.hooks';
import { useGetAllBrandsQuery } from '@/store/api/brand.api';
import { useFetchPaginatedProductsMutation } from '@/store/api/product.api';
import { KeywordSearchContext } from '@/types/context/shop.context';
import type { FilterProdState, KeywordSearchProps } from '@/types/shop.types';
import { Spinner } from '@/utils';
import { CardBlock } from '@/utils/product_cards/products';

import {
  animationTransition,
  initialFilters,
  useBrandFilterHandler,
  useKeywordFilterHandler,
  useOriginFilterHandler,
  usePriceFilterHandler,
} from './shop_parts/filters.logic';
import fetchProducts from './shop_parts/get.products';
import BrandFilter from './shop_parts/shop_components/brand_filter';
import CountryOfOriginSelector from './shop_parts/shop_components/country_selector';
import KeywordSearch from './shop_parts/shop_components/keyword_search';
import PriceFilter from './shop_parts/shop_components/price_filter';

const ShopGuitars = (): JSX.Element => {
  const [
    fetchPaginatedProducts,
    { data: initialProducts, isLoading, isError },
  ] = useFetchPaginatedProductsMutation();

  const { data: brands } = useGetAllBrandsQuery({ order: 'desc', limit: 100 });
  const [products, setProducts] = useState(initialProducts?.docs);
  const [allFilters, setAllFilters] = useState<FilterProdState>(initialFilters);
  const [countryName, setCountryName] = useState<string[] | undefined>([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const stableAllFilters = useMemo(() => allFilters, [allFilters]);
  const brandFilterHandler = useBrandFilterHandler(
    { setAllFilters, stableAllFilters, initialProducts },
  );
  const priceFilterHandler = usePriceFilterHandler({ setAllFilters, stableAllFilters });
  const keywordFilterHandler = useKeywordFilterHandler({ setAllFilters, stableAllFilters });
  const originFilters = useOriginFilterHandler({ setAllFilters, stableAllFilters });

  useScrollOnTop();

  useEffect(() => {
    const processPromise = async () => fetchProducts({
      fetchPaginatedProducts,
      setProducts,
      setCountryName,
      setAllFilters,
      brands,
    });

    void processPromise();
  }, [brands, fetchPaginatedProducts]);

  const { filterByBrandId, resetBrandFilter, applyBrandFilter } = brandFilterHandler;
  const { filterByPrice, resetPriceFilter, applyPriceFilter } = priceFilterHandler;
  const { filterByKeyword, resetKeywordFilter, applyKeywordFilter } = keywordFilterHandler;
  const { filterByCountryName, applyCountryNameFilter } = originFilters;

  useEffect(() => {
    const { triggeredFilters } = stableAllFilters;

    if (
      triggeredFilters.brand
      || triggeredFilters.priceRange
      || triggeredFilters.keywordState
      || triggeredFilters.countryOriginState
    ) {
      let filteredDocs = initialProducts?.docs;

      filteredDocs = applyBrandFilter(filteredDocs);
      filteredDocs = applyPriceFilter(filteredDocs);
      filteredDocs = applyKeywordFilter(filteredDocs);
      filteredDocs = applyCountryNameFilter(filteredDocs);

      setProducts(filteredDocs);
      setIsFiltering(false);
    } else {
      setProducts(initialProducts?.docs);
      setIsFiltering(false);
    }
  }, [
    stableAllFilters,
    initialProducts,
    applyBrandFilter,
    applyPriceFilter,
    applyKeywordFilter,
    applyCountryNameFilter,
  ]);

  const filtersLoadingPromises = useCallback(async () => {
    setIsFiltering(true);
    await Promise.all([applyBrandFilter, applyCountryNameFilter]);
  }, [applyBrandFilter, applyCountryNameFilter]);

  const keywordSearchValues: KeywordSearchProps = useMemo(() => ({
    filters: stableAllFilters, resetKeywordFilter, filterByKeyword,
  }), [filterByKeyword, stableAllFilters, resetKeywordFilter]);

  if (isError) {
    return <div>An error occurred</div>;
  }

  if (isFiltering || isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mt-20 flex size-fit items-start justify-center gap-20">
      <section className="sticky top-0 mt-4 flex h-fit w-[450px] max-w-3xl flex-col gap-10 px-5">
        <h1 className="text-center text-3xl text-white">Apply Filters</h1>

        <hr className="my-2 h-1 w-full bg-gray-900" />
        {/* Keyword filter/search */}
        <KeywordSearchContext.Provider value={keywordSearchValues}>
          <KeywordSearch />
        </KeywordSearchContext.Provider>

        {/* Country origin filter */}

        <CountryOfOriginSelector
          filters={stableAllFilters}
          countryName={countryName}
          filterByCountry={filterByCountryName}
          filtersLoadingPromises={filtersLoadingPromises}
        />

        {/* Brand Filter  */}

        <BrandFilter
          brands={brands}
          products={products}
          filters={stableAllFilters}
          filterByBrandId={filterByBrandId}
          resetBrandFilter={resetBrandFilter}
          filtersLoadingPromises={filtersLoadingPromises}
        />

        {/* Price filter */}

        <PriceFilter
          filters={stableAllFilters}
          filterByPrice={filterByPrice}
          resetPriceFilter={resetPriceFilter}
          filtersLoadingPromises={filtersLoadingPromises}
        />

      </section>
      {/** Products  */}
      <section className="my-10 grid w-fit grid-cols-2 place-items-end gap-20 scroll-smooth">
        <LayoutGroup id="shop-guitars">
          <AnimatePresence mode="popLayout">
            {products && products?.length > 0 ? products?.map((data) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 50 }}
                transition={animationTransition}
                key={data._id}
              >
                <CardBlock product={data} searchKeyword={allFilters.keyword} />
              </motion.div>
            )) : (
              <div className="relative left-1/2 top-40 bg-white p-2 text-center font-rubik text-2xl font-bold text-gray-900">
                No Products Found
                {' '}
                <br />
                Apply other filters to see products.
              </div>
            )}
          </AnimatePresence>
        </LayoutGroup>

      </section>
    </div>
  );
};

export default ShopGuitars;
