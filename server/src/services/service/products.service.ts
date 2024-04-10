import { Types, type PipelineStage } from 'mongoose';

import Product from '../../models/product';
import type { IProduct } from '../../models/types/product.types';
import { ApiError } from '../../utils/middleware/middleware';
import type { AggregatePaginateResult, ArgsInterface } from '../types/service.types';

const addProduct = async ({ ...product }: IProduct): Promise<IProduct> => {
  const productBody = new Product({ ...product });
  await productBody.save();

  return productBody;
};

const getAllProducts = async ({ limit = 5, order = 'asc', sort = '_id' }: ArgsInterface) => Product.find({})
  .sort([[sort, order]])
  .limit(limit)
  .populate('brand', '-_id');

const getProductById = async (id: string) => Product.findById(id).populate('brand');

const updateProductById = async (
  { ...items }: IProduct,
  id: string,
) => Product.findByIdAndUpdate(id, { ...items }, { new: true });

const deleteProductById = async (id: string) => Product.findByIdAndDelete(id);
const deleteOneImageByUrl = async (id: string, imageUrl: string) => Product.updateOne(
    { _id: id },
    { $pull: { image: { $in: [ imageUrl ] } } }
).exec();

const addImageUrl = async (id: string, imageUrl: string) => Product.updateOne(
  { _id: id },
  { $push: { image: imageUrl } }
).exec();

const paginateAll = async ({
  page, limit, sort, keyword, brand, price,
}: ArgsInterface): Promise<AggregatePaginateResult<IProduct>> => {
  const pipeline: PipelineStage[] = [];

  if (keyword && keyword.length > 0) {
    pipeline.push({
      $match: {
        model: {
          $regex: keyword,
          $options: 'i',
          $exists: true,
          $ne: null,
        },
      },
    });
  }

  if (brand && brand.length > 0) {
    pipeline.push({
      $match: {
        brand: {
          $in: brand.map((item) => (new Types.ObjectId(item))),
          $exists: true,
          $ne: null,
        },
      },
    });
  }

  if (price && price.length === 2) {
    const [min, max] = price;
    if (min < max && min > 0 && max > 0) {
      pipeline.push({
        $match: {
          price: {
            $lte: max,
            $gte: min,
            $exists: true,
            $ne: null,
          },
        },
      });
    } else {
      throw ApiError.ValidationError('Invalid price range');
    }
  } else {
    throw ApiError.ValidationError('Invalid price format');
  }

  const options = {
    page: page || 1,
    limit: limit || 5,
    sort: { date: sort || 'asc' },
  };

  return Product.aggregatePaginate(Product.aggregate(pipeline), options);
};

export default {
  addProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  deleteOneImageByUrl,
  addImageUrl,
  paginateAll,
};
