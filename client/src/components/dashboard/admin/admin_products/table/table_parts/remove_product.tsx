import {
  Button,
  Dialog, DialogBody, DialogFooter, DialogHeader,
} from '@material-tailwind/react';
import type { JSX } from 'react';
import { useContext } from 'react';

import { RemoveProductContext } from '@/types/context/admin.context';

const RemoveProduct = (): JSX.Element => {
  const props = useContext(RemoveProductContext);
  const { dialogOpened, removeProduct, setDialogClosed } = props;
  return (
    <Dialog
      open={dialogOpened}
      handler={() => { }}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      size="md"
    >
      <DialogHeader className="justify-center rounded-t-md border-b border-gray-700 bg-gray-900 font-rubik tracking-wider text-white">
        Confirm Product Removal
      </DialogHeader>
      <DialogBody className="border-t-white bg-gray-900 font-rubik text-lg font-extralight tracking-wide text-white">
        Are you sure you want to delete this product?
        <br />
        {' '}
        This product will be permanently removed from the database.
      </DialogBody>
      <DialogFooter>
        <div className="mx-4 flex w-full items-stretch justify-between">
          <Button
            color="red"
            onClick={removeProduct}
            className="border-t-1 border-gray-400 font-rubik text-lg font-bold leading-normal tracking-wide text-white shadow-lg shadow-gray-900/25 transition-all duration-150 ease-linear hover:bg-red-300"
          >
            Remove Product
          </Button>
          <Button
            color="gray"
            onClick={setDialogClosed}
            className="font-rubik text-lg font-bold leading-normal tracking-wide shadow-lg shadow-gray-900/25 transition-all duration-150 ease-linear hover:bg-gray-800 hover:text-white"
          >
            Dismiss Action
          </Button>
        </div>
      </DialogFooter>
    </Dialog>
  );
};
export default RemoveProduct;
