import type { FC, JSX } from 'react';
import {
  useEffect, useMemo, useState,
} from 'react';
import { InstantSearch } from 'react-instantsearch';
import { useNavigate } from 'react-router-dom';

import { algoliaClient, productIndex } from '@/algolia_setup';
import { useFetchPaginatedProductsMutation } from '@/store/api/product.api';
import type { AuthStateWithUser } from '@/types/auth.types';
import { AdminProductsContext } from '@/types/context/admin.context';
import { AuthStateError, showSwal, Spinner } from '@/utils';

import ProductList from './table/product_list';

const AdminProducts: FC<AuthStateWithUser> = ({ userData }): JSX.Element => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [
    fetchPaginatedProducts,
    { data: initialProducts, isLoading, isError },
  ] = useFetchPaginatedProductsMutation();

  const productListProps = useMemo(() => {
    const handlePrevPage = () => setCurrentPage((prevPage) => prevPage - 1);
    const handleNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
    const handleEditProduct = (id: string) => {
      navigate(`/dashboard/admin/edit_products/${id}`);
    };

    return {
      initialProducts,
      handlePrevPage,
      handleNextPage,
      handleEditProduct: (id: string) => handleEditProduct(id),
    };
  }, [initialProducts, navigate]);

  useEffect(() => {
    if (initialProducts?.docs) {
      void productIndex.partialUpdateObjects(initialProducts.docs.map((doc) => ({
        ...doc,
        objectID: doc._id,
      }))).wait();
    }
  }, [initialProducts]);

  useEffect(() => {
    const fetchProducts = async (page: number) => {
      if (userData?.user.role !== 'admin') {
        navigate('/dashboard');
        showSwal({
          title: 'Unauthorized Access',
          text: 'You do not have permission to access admin products page.',
          icon: 'error',
        });
        return;
      }
      try {
        await fetchPaginatedProducts({
          page,
          limit: 5,
          price: [100, 6000],
          brand: ['65822c0d0a0626090b86a2df', '656cf57837efc2434af973c4', '656cf3a8d0ce892d20b2768c', '661bd0d534bb3826ab89c0c3', '656cf5bd37efc2434af973c7', '65e781b8260638a239ac5e59'],
          keyword: '',
        }).unwrap();
      } catch (err) {
        showSwal({
          title: 'Error Fetching Products',
          text: 'An error occurred while fetching products. Please try again later.',
          icon: 'error',
        });
      }
    };

    void fetchProducts(currentPage);
  }, [currentPage, userData, fetchPaginatedProducts, navigate]);

  if (isLoading) {
    return (
      <div className="grid h-[800px] w-[1250px] place-items-center bg-gray-900">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="ml-1 grid h-screen w-[1250px] place-items-center bg-gray-100">
        <AuthStateError />
      </div>
    );
  }

  return (
    <div className="ml-4 mt-10 h-fit w-[1200px]">
      <InstantSearch
        searchClient={algoliaClient}
        indexName="products"
        future={{ preserveSharedStateOnUnmount: true }}
      >
        <AdminProductsContext.Provider value={productListProps}>
          <ProductList />
        </AdminProductsContext.Provider>

      </InstantSearch>
    </div>
  );
};

export default AdminProducts;
