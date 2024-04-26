import AddImageIcon from '@icons/add_photo_alternate_2.svg?react';
import type { FC } from 'react';

import type { ProductData } from '@/types/admin.types';

const DropImageField: FC<{
  handleAddImage: (file: File)=> Promise<void>;
  data?: ProductData;
  additionalClass?: string;
}> = ({ handleAddImage, data, additionalClass }) => (
  <div
    onDragOver={(e) => {
      e.preventDefault();
      e.stopPropagation();
    }}
    onDragEnter={(e) => {
      e.preventDefault();
      e.stopPropagation();
    }}
    onDrop={async (e) => {
      e.preventDefault();
      const { files } = e.dataTransfer;
      if (files.length > 0) {
        const file = files[0];
        await handleAddImage(file);
      }
    }}
  >
    <label
      htmlFor="fileInput"
      className={`flex ${data?.image && data.image.length % 5 === 0 ? 'size-80' : 'size-full'}  cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-blue-700 bg-blue-50 px-4 py-6 text-center text-blue-700 hover:bg-blue-100 ${data?.image.length === 0 ? additionalClass : ''}`}
    >
      <AddImageIcon className="size-24 fill-blue-600" />

      Drag and Drop or
      <br />
      {' '}
      Click to upload
      <br />
      {' '}
      image
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        hidden
        onChange={async (e) => {
          const { files } = e.target;
          if (files) {
            const file = files[0];
            await handleAddImage(file);
          }
        }}
      />
    </label>
  </div>
);

export default DropImageField;
