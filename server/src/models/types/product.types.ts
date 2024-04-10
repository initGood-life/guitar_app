import type {
  Aggregate, Model, PipelineStage,
  Types,
} from 'mongoose';

import type { AggregatePaginateOptions, AggregatePaginateResult } from '../../services/types/service.types';

// product interface definition
interface IProduct {
  model: string;
  brand: Types.ObjectId;
  description: string;
  price: number;
  available: number;
  item_sold: number;
  shipping: boolean;
  image: string[];
  date: Date;
  objectID?: string;
}

// product aggregate model interface definition
interface IProductModel extends Model<IProduct> {
  aggregatePaginate(
    pipeline?: Aggregate<PipelineStage[]>,
    options?: AggregatePaginateOptions,
    callback?: (err: unknown, result: AggregatePaginateResult<IProduct>)=> void
  ): Promise<AggregatePaginateResult<IProduct>>;
}

export type {
  IProduct,
  IProductModel,
};

