import { Card } from '@material-tailwind/react';
import type { JSX } from 'react';
import {
  memo, useCallback, useContext, useMemo, useState,
} from 'react';

import { useReactCookieHandler } from '@/custom/custom.hooks';
import { useAppDispatch, useAppSelector } from '@/redux.hooks';
import { useHandleRemoveProductMutation } from '@/store/api/product.api';
import { setId, storedId } from '@/store/features/id.handler';
import {
  AdminProductsContext, ProductTableContext, RemoveProductContext, TableNavContext,
} from '@/types/context/admin.context';
import { showSwal, Utils } from '@/utils';

import AlgoliaSearchProduct from '../search_product/product_search';
import { ProductTable } from './table_parts/product_table';
import RemoveProduct from './table_parts/remove_product';
import { daysAgo } from './table_parts/table.data';
import { TableNavigation } from './table_parts/table_nav';

const { WavesButton } = Utils;

const ProductList = memo((): JSX.Element => {
  const dispatch = useAppDispatch();
  const props = useContext(AdminProductsContext);
  const { cookies } = useReactCookieHandler();
  const productId = useAppSelector(storedId);
  const [handleRemoveProduct] = useHandleRemoveProductMutation();
  const [dialogActive, setDialogActive] = useState(false);
  const [products, setProduct] = useState(props?.initialProducts);
  const { id } = productId;

  const handleDialogOpen = useCallback(
    (incomingId?: string) => {
      dispatch(setId({ id: incomingId }));
      setDialogActive(true);
    },
    [dispatch, setDialogActive],
  );

  const removeProduct = useCallback(async () => {
    const token = cookies['x-access-token'];
    if (id) {
      await handleRemoveProduct({ id, token });
      setProduct((prevProducts) => ({
        ...prevProducts,
        docs: prevProducts?.docs?.filter((product) => product._id !== id),
      }));
      dispatch(setId({ id: undefined }));
      setDialogActive(false);
      showSwal({
        title: 'Product Removed!',
        text: 'Product has been successfully removed from database.',
        icon: 'success',
      });
    }
  }, [id, cookies, handleRemoveProduct, dispatch, setDialogActive]);

  const tableValues = useMemo(
    () => ({
      products,
      daysAgo,
      handleDialogOpen,
      handleEditProduct: props?.handleEditProduct,
    }),
    [products, props?.handleEditProduct, handleDialogOpen],
  );

  const tableNavValues = useMemo(
    () => ({
      products,
      handleNextPage: props?.handleNextPage,
      handlePrevPage: props?.handlePrevPage,
    }),
    [products, props?.handleNextPage, props?.handlePrevPage],
  );

  const removeProductValues = useMemo(() => ({
    dialogOpened: dialogActive,
    removeProduct,
    setDialogClosed: () => setDialogActive(false),
  }), [dialogActive, removeProduct]);

  if (!products) {
    return <div className="text-3xl font-semibold text-gray-900">Sorry :( No Products Found!!!</div>;
  }

  return (
    <>
      <AlgoliaSearchProduct />
      <WavesButton
        isLinked
        label="Add New Product"
        styled="bg-gray-900 ml-6 w-fit tracking-wider p-5 text-white font-rubik text-xl rounded-sm hover:bg-gray-800 hover:text-white transition-all duration-300 ease-in-out"
        link="/dashboard/admin/add_product"
      />
      <h1 className="absolute right-40 top-[140px] font-rubik text-4xl font-semibold -tracking-wider text-gray-900">Products Administration</h1>
      <Card className="relative mb-6 size-full overflow-x-auto">
        <ProductTableContext.Provider value={tableValues}>
          <ProductTable />
        </ProductTableContext.Provider>

        <TableNavContext.Provider value={tableNavValues}>
          <TableNavigation />
        </TableNavContext.Provider>

      </Card>

      <RemoveProductContext.Provider value={removeProductValues}>
        <RemoveProduct />
      </RemoveProductContext.Provider>
    </>
  );
});

export default ProductList;
