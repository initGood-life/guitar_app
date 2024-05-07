import SelectIcon from '@icons/expand_more.svg?react';
import { Radio } from '@material-tailwind/react';
import { AnimatePresence, motion } from 'framer-motion';
import type { FC, JSX } from 'react';
import { useRef, useState } from 'react';

import { useOuterEventHandler } from '@/custom/custom.hooks';
import type { CountryOfOriginSelectorProps } from '@/types/shop.types';

const CountryOfOriginSelector: FC<CountryOfOriginSelectorProps> = (
  {
    filters, countryName, filterByCountry, filtersLoadingPromises,
  },
): JSX.Element => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showSelected, setShowSelected] = useState(false);

  const toggleDropDown = () => {
    setShowSelected((prevState) => !prevState);
  };

  useOuterEventHandler(
    dropdownRef,
    () => setShowSelected(false),
    'click',
  );

  const handleFilterByCountry = async (country: string) => {
    filterByCountry(country);

    if (filtersLoadingPromises) {
      await filtersLoadingPromises();

      setShowSelected(false);
    }
  };

  const handleKeyUp = (key: string) => {
    if (key === 'Enter') {
      filterByCountry(key);
    }
  };

  return (
    <div ref={dropdownRef} className="relative w-80">
      <button
        type="button"
        name="country_origin"
        color="gray"
        role="combobox"
        aria-labelledby="select button"
        aria-haspopup="listbox"
        aria-expanded="false"
        aria-controls="select-dropdown"
        value={filters.countryOrigin}
        onClick={toggleDropDown}
        className="h-12 w-80 cursor-pointer appearance-none rounded-md bg-white p-2 text-start text-lg shadow-md ring-gray-600 transition-all duration-200 ease-in-out hover:shadow-lg focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-500"
      >
        <span className="font-rubik text-gray-500">Select by Country</span>
      </button>
      <AnimatePresence>
        {showSelected && (
        <motion.ul
          layout
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.3,
            type: 'spring',
            ease: 'easeOut',
            damping: 20,
            stiffness: 300,
          }}
          id="select-dropdown"
          role="listbox"
          aria-hidden="true"
          className="absolute z-10 mt-2 w-80 rounded-md border bg-white shadow-lg ring-gray-600"
        >
          {countryName?.map((country) => (
            <li
              key={country}
              role="option"
              aria-selected={false}
              className="cursor-pointer border-y border-gray-300 p-2 text-lg text-gray-700 transition-colors duration-150 ease-in-out hover:bg-gray-400/60"
              onClick={() => handleFilterByCountry(country)}
              onKeyUp={({ key }) => handleKeyUp(key)}
            >
              <Radio
                readOnly
                crossOrigin="anonymous"
                checked={country === filters.countryOrigin}
              />
              {' '}
              <span className="ml-4">{country}</span>
            </li>
          ))}

          <li
            role="option"
            aria-selected={false}
            className="cursor-pointer border-y border-gray-300 p-2 text-lg text-gray-700 transition-colors duration-150 ease-in-out hover:bg-gray-400/60"
            onClick={() => handleFilterByCountry('all')}
            onKeyUp={({ key }) => handleKeyUp(key)}
          >
            <Radio
              crossOrigin="anonymous"
              readOnly
              checked={[...new Set(countryName)].map(
                (country) => country !== filters.countryOrigin,
              ).every((bool) => bool)}
            />
            {' '}
            <span className="ml-4">All</span>
          </li>
        </motion.ul>
        )}
      </AnimatePresence>
      <SelectIcon
        className="pointer-events-none absolute right-1 top-0 size-12 cursor-pointer rounded-md fill-gray-900"
      />
    </div>
  );
};

export default CountryOfOriginSelector;
