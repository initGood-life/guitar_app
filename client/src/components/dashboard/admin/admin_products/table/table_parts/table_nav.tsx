import BackwardIcon from '@icons/dashboard_icons/arrow_back.svg?react';
import ForwardIcon from '@icons/dashboard_icons/arrow_forward.svg?react';
import { useContext } from 'react';

import { TableNavContext } from '@/types/context/admin.context';

export const TableNavigation = () => {
  const props = useContext(TableNavContext);
  const { products, handleNextPage, handlePrevPage } = props;
  return (
    <nav
      className="flex items-center justify-center gap-4 rounded-b-lg border-x-1 border-gray-300 bg-white py-6 shadow-lg shadow-gray-900/80"
      aria-label="Table navigation"
    >
      <button
        onClick={handlePrevPage}
        disabled={!products?.rest?.hasPrevPage}
        className="flex items-center justify-center rounded-lg border bg-gray-900 transition-opacity duration-150 ease-in-out hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-85 disabled:opacity-50"
        type="button"
      >
        <BackwardIcon
          className={`${products?.rest?.hasPrevPage ? 'hover:fill-white' : ''} h-8 w-8 fill-blue-gray-200 transition-all duration-150 ease-in-out`}
        />
      </button>
      <span className="cursor-default text-lg font-medium text-gray-900">
        Page
        {' '}
        <span className="font-semibold">{products?.rest?.page}</span>
        {' '}
        of
        {' '}
        <span className="font-semibold">{products?.rest?.totalPages}</span>
      </span>
      <button
        onClick={handleNextPage}
        disabled={!products?.rest?.hasNextPage}
        className="flex items-center justify-center rounded-lg border bg-gray-900 transition-opacity duration-150 ease-in-out hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-85 disabled:opacity-50"
        type="button"
      >
        <ForwardIcon
          className={`${products?.rest?.hasNextPage ? 'hover:fill-white' : ''} h-8 w-8 fill-blue-gray-200 transition-all duration-150 ease-in-out`}
        />
      </button>
    </nav>
  );
};
