import Brand from '../../models/brand';
import type { IBrand } from '../../models/types/brand.types';
import type { ArgsInterface } from '../types/service.types';

const addBrand = async ({
  name,
  description,
  website,
}: IBrand): Promise<IBrand> => {
  const brand = new Brand({
    name,
    description,
    website,
  });
  await brand.save();

  return brand;
};

const getBrands = async ({ limit, order }: ArgsInterface) => Brand.find({}).sort([
  ['_id', order || 'asc'],
]).limit(limit || 5);

const getBrandById = async (id: string) => Brand.findById(id);

const deleteBrandById = async (id: string) => Brand.findByIdAndDelete(id);

export default {
  addBrand,
  getBrands,
  getBrandById,
  deleteBrandById,
};
