import {
  lazy, useEffect, useMemo, useState,
} from 'react';
import { useParams } from 'react-router-dom';

import { useReactCookieHandler } from '@/custom/custom.hooks';
import { useHandleAddProdImageMutation, useLazyFetchProductsByIdQuery } from '@/store/api/product.api';
import type { FulfilledData } from '@/types/admin.types';
import { RemoveImageDialogContext } from '@/types/context/admin.context';
import { Spinner } from '@/utils';

import DropImageField from './image_handlers/drop_image';
import ProductImageList from './image_handlers/image_list';
import { addImage } from './image_handlers/logics';

const ImageDropDialog = lazy(() => import('./dialog_confirm'));

const EditImages = () => {
  const { id } = useParams();
  const { cookies } = useReactCookieHandler();
  const [fetchProductById, { isLoading }] = useLazyFetchProductsByIdQuery();
  const [addImageHandler] = useHandleAddProdImageMutation();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [product, setProduct] = useState<FulfilledData>({ data: undefined });

  const { data } = product;
  const token = cookies['x-access-token'];

  useEffect(() => {
    const getById = async () => {
      const productData = await fetchProductById({ id });
      setProduct(productData);
    };
    void getById();
  }, [fetchProductById, id]);

  const handleAddImage = async (file: File) => addImage({
    file, id, token, data, setProduct, addImageHandler,
  });

  const imageDialogValues = useMemo(() => ({
    id, imageUrl: selectedImage, showDialog, data, setProduct, setShowDialog,
  }), [data, id, selectedImage, showDialog, setProduct, setShowDialog]);

  const showDialogImageToRemove = () => (
    <RemoveImageDialogContext.Provider value={imageDialogValues}>
      <ImageDropDialog />
    </RemoveImageDialogContext.Provider>
  );

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-900">
        <Spinner />
      </div>
    );
  }

  if (data?.image.length === 0) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <h1 className="text-xl text-gray-900">No images available for this product</h1>
      </div>
    );
  }

  return (
    <div className="flex h-fit w-screen flex-col items-center justify-center">
      <h1 className="p-3 text-center font-rubik text-4xl font-bold">Manage Product Images</h1>

      <div className="mt-auto grid grid-cols-5 gap-4">
        {data?.image?.map((img) => (
          <ProductImageList
            img={img}
            key={img}
            data={data}
            setSelectedImage={setSelectedImage}
            setShowDialog={setShowDialog}
          />
        ))}

        <DropImageField data={data} handleAddImage={handleAddImage} />
      </div>
      {showDialog && showDialogImageToRemove()}
    </div>
  );
};

export default EditImages;
