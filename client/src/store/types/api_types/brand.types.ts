export interface BrandArgs {
  name: string;
  description: string;
  website: string;
  _id?: string;
}

export type BrandResponse = BrandArgs[];

export interface AllBrandsArgs {
  order: 'desc' | 'asc';
  limit: number;
}
