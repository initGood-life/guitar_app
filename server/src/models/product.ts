import { model, Schema } from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

import type { IProduct, IProductModel } from './types/product.types';

const ProductSchema = new Schema<IProduct>({
  model: {
    type: String,
    required: [true, 'Please provide a model for the product!'],
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: 'Brand',
    required: [true, 'Please provide a brand for the product!'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for the product!'],
    trim: true,
    minlength: 3,
    maxlength: 250,
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price for the product!'],
    min: 0,
    max: 1000000,
  },
  available: {
    type: Number,
    required: [true, 'How many items of product are available'],
    min: 0,
    max: 1000000,
    default: 0,
  },
  item_sold: {
    type: Number,
    required: [true, 'Please provide a count sold for the product!'],
    min: 0,
    max: 1000000,
    default: 0,
  },
  shipping: {
    type: Boolean,
    required: [true, 'Specify if free shipping available!'],
    default: false,
  },
  image: {
    type: [String],
    required: [true, 'Please provide an image for the product!'],
    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// add the aggregatePaginate plugin to the schema
ProductSchema.plugin(aggregatePaginate);

// change the id to string and remove the __v from the output
ProductSchema.set('toJSON', {
  transform: (_document, returnedObj) => {
    const newObj = { ...returnedObj };
    newObj.id = String(newObj._id);
    delete newObj.id;
    return newObj;
  },
  versionKey: false,
});

export default model<IProduct, IProductModel>('Product', ProductSchema);
