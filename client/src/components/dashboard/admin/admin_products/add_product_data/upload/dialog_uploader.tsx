import CloseIcon from '@icons/close_icon.svg?react';
import { Dialog, DialogBody } from '@material-tailwind/react';
import type { FC } from 'react';

import type { IImageDialogProps } from '@/types/admin.types';

import ImageDropField from './img_uploader';

const ImageDropDialog: FC<IImageDialogProps> = (
  { isImageUploading, setIsImageUploading },
) => (
  <Dialog
    open={isImageUploading}
    size="xl"
    className="bg-gray-900 p-5"
    handler={() => {}}
    animate={{
      mount: { scale: 1, y: 0 },
      unmount: { scale: 0.9, y: -100 },
    }}
  >
    <CloseIcon
      className="absolute right-2 top-2 size-8 cursor-pointer fill-gray-500 transition-colors duration-200 ease-out hover:fill-red-500"
      onClick={() => setIsImageUploading(false)}
    />
    <DialogBody>
      <ImageDropField />
    </DialogBody>
  </Dialog>
);

export default ImageDropDialog;
