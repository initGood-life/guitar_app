import {
  Button, Dialog, DialogBody, DialogFooter, DialogHeader,
} from '@material-tailwind/react';
import { useContext } from 'react';

import { useReactCookieHandler } from '@/custom/custom.hooks';
import { useHandleRemoveImageMutation } from '@/store/api/product.api';
import { RemoveImageDialogContext } from '@/types/context/admin.context';

import { removeImage } from './image_handlers/logics';

const ImageDropDialog = () => {
  const [handleRemoveImage, { isLoading }] = useHandleRemoveImageMutation();
  const props = useContext(RemoveImageDialogContext);
  const {
    imageUrl, id, showDialog, data, setProduct, setShowDialog,
  } = props;
  const { cookies } = useReactCookieHandler();
  const token = cookies['x-access-token'];
  const handleOpen = () => setShowDialog(!showDialog);
  const removeImageHandler = async () => removeImage({
    imageUrl, id, token, data, setProduct, setShowDialog, handleRemoveImage,
  });

  return (
    <Dialog
      open={showDialog}
      handler={handleOpen}
      animate={{
        mount: { scale: 1, y: 0, opacity: 1 },
        unmount: { scale: 0, y: 100, opacity: 0 },
      }}
      size="md"
      aria-modal="true"
      tabIndex={0}
    >
      <DialogHeader className="justify-center rounded-t-md border-b border-gray-700 bg-gray-900 font-rubik tracking-wider text-white">Removing image from storage</DialogHeader>
      <DialogBody className="border-t-white bg-gray-900 font-rubik text-lg font-extralight tracking-wide text-white">
        Are you sure you want to remove the image permanently?
        <br />
        {' '}
        This action cannot be undone.
      </DialogBody>
      <DialogFooter className="flex w-full items-center gap-6">

        <Button
          variant="filled"
          onClick={removeImageHandler}
          loading={isLoading}
          className="bg-gray-900 font-rubik text-lg font-bold leading-normal tracking-wide transition-all duration-150 ease-linear hover:bg-gray-800 hover:drop-shadow-sm"
        >
          Remove Images
        </Button>
        <Button
          variant="text"
          color="green"
          onClick={handleOpen}
          className="font-rubik text-lg font-bold leading-normal tracking-wide transition-all duration-150 ease-linear hover:drop-shadow-lg"
        >
          Cancel
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ImageDropDialog;
