import Site from '../../models/site';
import type { ISiteModel } from '../../models/types/site.types';

const getAllInfo = async () => Site.find({});

const addSiteInfo = async ({ ...info }: ISiteModel): Promise<ISiteModel> => {
  const newInfo = new Site({ ...info });
  await newInfo.save();

  return newInfo;
};

const updateSite = async (
  { _id, ...info }: ISiteModel,
) => Site.findOneAndUpdate({ _id }, { ...info }, { new: true });

export default {
  getAllInfo,
  addSiteInfo,
  updateSite,
};
