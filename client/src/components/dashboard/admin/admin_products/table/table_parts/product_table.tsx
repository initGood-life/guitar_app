import { Button, Typography } from '@material-tailwind/react';
import { useContext, useState } from 'react';
import type { JSX } from 'react/jsx-runtime';

import { ProductTableContext } from '@/types/context/admin.context';
import { Utils } from '@/utils';

import { cellRenderer, imageCellRenderer } from './render_cells';
import { TABLE_HEAD } from './table.data';

const { WavesButton } = Utils;
export const ProductTable = (): JSX.Element => {
  const props = useContext(ProductTableContext);
  const { products, handleEditProduct } = props;
  const [showText, setShowText] = useState({
    src: '',
    status: false,
  });

  return (
    <table className="w-full min-w-max table-auto text-left shadow-sm shadow-blue-gray-900/10">
      <thead>
        <tr>
          {TABLE_HEAD.map((head) => (
            <th key={head} className="cursor-default bg-gray-900 px-2 py-6 font-rubik tracking-wider">
              <Typography
                variant="small"
                color="blue-gray"
                className="text-center text-lg font-semibold uppercase tracking-wider text-white"
              >
                {head}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {products?.docs?.map((product, index) => (
          <tr
            key={product?._id}
            className={`border-b ${index % 2 === 0 && 'bg-gray-300/90 text-gray-900'}`}
          >
            <td className="p-4 text-center">
              {cellRenderer(`${props.daysAgo(product?.date)} days ago`)}
            </td>
            <td className="p-4 text-center">
              {product.image[0] || product.image.length > 0 ? (
                <WavesButton
                  isLinked
                  link={`/dashboard/admin/prod_images/${product._id}`}
                >
                  {
                    imageCellRenderer({
                      image: product.image,
                      model: product.model,
                      showText,
                      setShowText,
                    })
                  }
                </WavesButton>
              ) : (
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/guitar-bcc61.appspot.com/o/images%2Fimage_318408download.jpg?alt=media&token=8647608f-c947-4487-ad4f-1ea5f9b729aa"
                  alt={product.model}
                  className="h-24 w-24"
                />
              )}

            </td>
            <td className="p-4 text-center">
              {cellRenderer(product?.model)}
            </td>
            <td className="p-4 text-center">
              {product?.available > 0 ? cellRenderer(product.available) : <span className="font-bold text-red-500">Out of Stock</span>}
            </td>
            <td className="p-4 text-center">
              {cellRenderer(product?.price)}
            </td>
            <td className="p-4 text-center">
              {cellRenderer(product?.shipping
                ? <span className="text-green-500">Yes</span>
                : <span className="text-red-500">No</span>)}
            </td>
            <td className="mt-6 flex items-center justify-center gap-8 p-4 text-center">
              <Button
                onClick={() => props.handleDialogOpen(product._id)}
                variant="outlined"
                color="red"
                className="w-24 rounded-md bg-red-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700"
              >
                Delete
              </Button>
              <div className="h-10 w-px bg-gray-400" />
              {handleEditProduct && (
                <Button
                  onClick={() => product._id && handleEditProduct(product._id)}
                  variant="outlined"
                  className="w-24 rounded-md bg-gray-900 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800"
                >
                  EDIT
                </Button>
              )}
            </td>

          </tr>
        ))}

      </tbody>
    </table>
  );
};
