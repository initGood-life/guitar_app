import { Typography } from '@material-tailwind/react';
import { AnimatePresence, motion } from 'framer-motion';

export const cellRenderer = (cellData?: React.ReactNode) => (
  <Typography
    variant="small"
    color="blue-gray"
    className="text-base font-normal"
  >
    {cellData}
  </Typography>
);

export const imageCellRenderer = ({
  image, model, showText, setShowText,
}: {
  image: string[];
  model: string;
  showText: {
    src: string;
    status: boolean;
  };
  setShowText: React.Dispatch<React.SetStateAction<{
    src: string;
    status: boolean;
  }>>;
}): JSX.Element => {
  const handleOnMouseEnter = (src: string) => {
    setShowText({
      src,
      status: true,
    });
  };

  const handleOnMouseLeave = () => {
    setShowText({
      src: '',
      status: false,
    });
  };

  return (
    <div
      className="relative size-24 overflow-hidden rounded-sm bg-gray-900"
    >
      {image.map((img) => (
        <div
          key={img}
          className="relative size-24 overflow-hidden rounded-sm bg-gray-900"
          onMouseEnter={() => handleOnMouseEnter(img)}
          onMouseLeave={handleOnMouseLeave}
        >
          <img
            src={img}
            alt={model}
            className="pointer-events-none size-24 rounded-sm"
          />
          <AnimatePresence>
            {showText.status && showText.src === img && (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 50 }}
                transition={{
                  duration: 0.2, delay: 0.2, ease: 'easeIn',
                }}
                className="absolute left-0 top-0 grid size-full items-center bg-black/50 text-xs text-white"
              >
                Click to view product images
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};
