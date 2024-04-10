import type {
  BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, MutationDefinition,
} from '@reduxjs/toolkit/query';
import {
  deleteObject, getDownloadURL, ref, uploadBytes,
} from 'firebase/storage';
import type { MutationTrigger } from 'node_modules/@reduxjs/toolkit/dist/query/react/buildHooks';

import { storage } from '@/firebase.config';
import type { RemoveImageURLArg } from '@/store/types/api_types/product.types';
import type { FulfilledData, ProductData } from '@/types/admin.types';
import { showSwal } from '@/utils';

export const addImage = async ({
  file, id, token, data, setProduct, addImageHandler,
}: {
  file: File
  id?: string;
  data: ProductData | undefined;
  token: unknown;
  addImageHandler: MutationTrigger<MutationDefinition<Partial<RemoveImageURLArg>, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta>, never, null, 'productApi'>>
  setProduct: React.Dispatch<React.SetStateAction<FulfilledData>>;
}) => {
  const { name, size } = file;
  try {
    const randomId = `id_${Math.floor(Math.random() * 10000000)}`;
    const storageRef = ref(storage, `images/image_${randomId}${size}${name}`);
    const uploadTask = await uploadBytes(storageRef, file);
    const getUrl = await getDownloadURL(uploadTask.ref);
    if (getUrl && data) {
      await addImageHandler({
        id, token, imageUrl: getUrl,
      });

      setProduct({
        data: {
          ...data,
          image: [...data.image, getUrl],
        },
      });
      showSwal({
        title: 'Success',
        text: 'Image has been added',
        icon: 'info',
      });
    }
  } catch (error) {
    showSwal({
      title: 'Error',
      text: (error as Error).message,
      icon: 'error',
    });
  }
};

export const removeImage = async ({
  imageUrl, id, token, data, setProduct, setShowDialog, handleRemoveImage,
}: {
  imageUrl: string;
  id?: string;
  token: unknown;
  data: ProductData | undefined;
  setProduct: React.Dispatch<React.SetStateAction<FulfilledData>>;
  setShowDialog: (showDialog: boolean)=> void;
  handleRemoveImage: MutationTrigger<MutationDefinition<Partial<RemoveImageURLArg>, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta>, never, null, 'productApi'>>
}) => {
  try {
    const imagePath = imageUrl.split('images%2F')[1].split('?')[0];
    const imageRefToRemove = ref(storage, `images/${imagePath}`);

    await deleteObject(imageRefToRemove);
    await handleRemoveImage({ id, imageUrl, token });

    if (data) {
      setProduct({
        data: {
          ...data,
          image: data.image.filter((image) => image !== imageUrl),
        },
      });
    }
    showSwal({
      title: 'Success',
      text: 'Image has been removed',
      icon: 'info',
    });
    setShowDialog(false);
  } catch (error) {
    showSwal({
      title: 'Error',
      text: (error as Error).message,
      icon: 'error',
    });
  }
};
