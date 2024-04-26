import { AnimatePresence, motion } from 'framer-motion';
import type { Dispatch, FC, SetStateAction } from 'react';
import { useState } from 'react';

import type { ProductData } from '@/types/admin.types';

const ProductImageList: FC<{
  img: string
  data: ProductData | undefined;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  setSelectedImage: Dispatch<SetStateAction<string>>;
}> = ({
  data, img, setShowDialog, setSelectedImage,
}) => {
  const [showDelete, setShowDelete] = useState({ src: '', status: false });
  return (
    <div
      className="relative"
      onMouseEnter={() => setShowDelete({
        src: img,
        status: true,
      })}
      onMouseLeave={() => setShowDelete({
        src: '',
        status: false,
      })}
    >
      <img
        src={img}
        alt={data?.model}
        className="size-full max-h-[400px] max-w-xl cursor-pointer rounded-lg object-cover object-center"
      />
      <AnimatePresence>
        {showDelete.status && showDelete.src === img && (
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{
            duration: 0.5, delay: 0.4, ease: 'easeOut', type: 'spring',
          }}
          className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 backdrop-blur-sm"
        >
          <button
            type="button"
            className="rounded-lg bg-red-500 px-4 py-2 font-rubik text-xl font-medium uppercase text-white hover:bg-red-400"
            onClick={() => {
              setShowDialog(true);
              setSelectedImage(img);
            }}
          >
            Delete
          </button>
        </motion.div>

        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductImageList;
