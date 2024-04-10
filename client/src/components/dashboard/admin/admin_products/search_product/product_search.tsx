import type { FC, JSX } from 'react';
import {
  Configure, Hits,
  SearchBox,
  useSearchBox,
} from 'react-instantsearch';

interface HitProps {
  hit: {
    brand: {
      name: string
    }
    model: string
  };
}

// eslint-disable-next-line max-len
/* // TODO: Implement search functionality, so when user clicks search result tab it highlights the row with searched product that matches the one in table.  Clicking the result tab should remove the highlight */
const Hit: FC<HitProps> = ({ hit }): JSX.Element => (
  <div
    className="mt-1 flex justify-start border-t border-gray-200 p-3 transition-colors duration-300 hover:bg-gray-400"
    role="button"
    tabIndex={0}
    onClick={() => alert('gg')}
    onKeyDown={() => alert('gg')}
  >
    <h3 className="grow font-rubik text-lg font-medium tracking-wide text-gray-900">{hit.model}</h3>

    <p className="text-sm text-gray-700">{hit.brand.name}</p>
  </div>
);

const AlgoliaSearchProduct = (): JSX.Element => {
  const { query } = useSearchBox();
  return (
    <div className="relative z-30 mb-10 inline-flex max-w-lg flex-col">
      <Configure hitsPerPage={15} />
      <SearchBox
        placeholder="Search model..."
        classNames={{
          input: 'block bg-gray-50 w-full text-xl rounded-lg border border-gray-900 bg-white px-4 py-3 text-gray-900 focus:border-gray-900 focus:outline-none focus:ring ring-gray-900',
          submit: 'absolute right-4 end-2.5 bottom-2.5 rounded-lg bg-gray-900 px-4 py-2  hover:bg-gray-600 transition-colors duration-200',
          submitIcon: 'h-5 w-5 fill-white',
          form: 'max-w-md',
          reset: 'hidden',
        }}
        ignoreCompositionEvents
        searchAsYouType={false}
        inputMode="search"

      />
      {query && (
        <Hits
          classNames={{
            root: 'grid grid-cols-1 gap-4 mt-4 absolute top-10 bg-white w-full max-h-96 overflow-y-auto shadow cursor-pointer',
            emptyRoot: 'text-gray-500 text-center py-8',
          }}
          hitComponent={Hit}
        />
      )}
    </div>
  );
};

export default AlgoliaSearchProduct;
