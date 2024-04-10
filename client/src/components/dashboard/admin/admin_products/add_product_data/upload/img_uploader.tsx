import type { ExtFile } from '@files-ui/react';
import { Dropzone, FileMosaic } from '@files-ui/react';
import CloseImageViewIcon from '@icons/close_FILL0_wght400_GRAD0_opsz24.svg?react';
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useField } from 'formik';
import { useState } from 'react';

import { storage } from '@/firebase.config';
import { showSwal } from '@/utils';

const ImageDropField = () => {
  const [,,helper] = useField('image');
  const [dropField, setDropField] = useState<ExtFile[]>([]);
  const [imagePreview, setImagePreview] = useState<string | undefined>('');
  const [handlePreview, setHandlePreview] = useState(false);
  const [imageUploadSize, setImageUploadSize] = useState(300);
  const [imageUploadStatus, setImageUploadStatus] = useState(false);

  const handleImagePreviewSize = (size: number) => {
    if (size > 2) setImageUploadSize(300);
    if (size > 3) setImageUploadSize(240);
    if (size === 5) setImageUploadSize(190);
  };

  const handleUploadImage = async ({
    name, file, valid, size, id,
  }: ExtFile): Promise<string | undefined> => {
    try {
      if (file && valid) {
        setImageUploadStatus(true);
        const storageRef = ref(storage, `images/image_${id}${size}${name}`);
        const uploadTask = await uploadBytesResumable(storageRef, file);
        const getUrl = await getDownloadURL(uploadTask.ref);

        setImageUploadStatus(false);

        return getUrl;
      }
    } catch (error) {
      showSwal({
        title: 'Error',
        text: 'Something went wrong',
        icon: 'error',
      });
      setDropField([]);
    }
    return undefined;
  };

  const handleUploadImages = async (images: ExtFile[]) => {
    try {
      setDropField(images);
      handleImagePreviewSize(images.length);

      const handleUpload = Array.from(images, (image) => handleUploadImage(image));

      const promiseResult = await Promise.all(handleUpload);
      console.log(promiseResult);

      await helper.setValue(promiseResult);
    } catch (error) {
      showSwal({
        title: 'Error',
        text: 'Something went wrong',
        icon: 'error',
      });
      setDropField([]);
    }
  };

  const handleDelete = (id: string | number | undefined) => {
    setDropField(dropField.filter((item) => item.id !== id));
  };

  const handlePreviewImage = (url: string | undefined) => {
    setImagePreview(url);
    setHandlePreview(true);
  };

  return (
    <Dropzone
      onChange={handleUploadImages}
      maxFileSize={10 * 1024 * 1024}
      maxFiles={5}
      value={dropField}
      multiple
      disabled={handlePreview}
      autoClean
      name="image"
      headerConfig={{
        style: {
          color: 'gray',
          borderBottom: '1px dotted #666A6D',
          padding: '5px',
          backgroundColor: '#343434',
          cursor: 'default',
          fontSize: '15px',
          fontWeight: 'normal',
        },
      }}
      footerConfig={{
        style: {
          color: 'gray',
          fontSize: '15px',
          fontWeight: 'normal',
          marginTop: '10px',
        },
      }}
      uploadConfig={{
        asBlob: true,
        cleanOnUpload: true,
      }}
      accept={'image/*'}
      label="Drop images here or click to select"
      minHeight="500px"
    >
      {dropField?.map((item: ExtFile) => (
        <div key={item.id}>
          <div className="relative">
            <FileMosaic
              key={item.id}
              id={item.id}
              onSee={handlePreviewImage}
              style={{
                width: `${imageUploadSize}px`,
                height: `${imageUploadSize - 50}px`,
                margin: `${imageUploadSize <= 200 ? 5 : 8}px`,
                objectFit: 'cover',
                objectPosition: 'center',
                borderRadius: '6px',
              }}
              onDelete={handleDelete}
              preview
              alwaysActive
              info
              darkMode
              {...item}
            />
            {imageUploadStatus && (
            <div className="absolute left-4 top-0 grid h-[250px] w-[300px] place-items-center overflow-hidden bg-black/50">
              <svg
                className="h-16 w-16 animate-spin text-white"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
              >
                <path
                  d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-900"
                />
              </svg>
            </div>
            )}
          </div>

          {imagePreview && handlePreview && (
          <div className="fixed right-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50">
            <img
              src={imagePreview}
              alt={`img_${item.name}_${item.id}_preview`}
              className="absolute top-8 max-h-[90vh] w-fit rounded-sm"
            />
            <CloseImageViewIcon
              onClick={(e) => {
                e.stopPropagation();
                setHandlePreview(false);
              }}
              className="pointer-events-auto absolute right-4 top-0 h-16 w-16 cursor-pointer fill-white transition-colors duration-200 ease-out hover:fill-gray-500"
            />
          </div>
          )}
        </div>
      ))}
    </Dropzone>
  );
};

export default ImageDropField;
