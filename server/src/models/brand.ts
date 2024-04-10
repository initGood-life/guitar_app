import { model, Schema } from 'mongoose';
import validator from 'validator';

import type { IBrand } from './types/brand.types';

const brandSchema = new Schema<IBrand>({
  name: {
    type: String,
    required: [true, 'Please provide a name for the brand!'],
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: 'Name must be alphabetic!',
    },
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for the brand!'],
    trim: true,
    minlength: 3,
    maxlength: 250,
  },
  website: {
    type: String,
    required: [true, 'Please provide a website for the brand!'],
    trim: true,
    validate: {
      validator: (value: string) => validator.isURL(value),
      message: 'Please provide a valid URL.',
    },
  },
});

// remove the id and __v from the output
brandSchema.set('toJSON', {
  transform: (_document, returnedObj) => {
    const newObj = { ...returnedObj };
    newObj.id = String(newObj._id);
    delete newObj.id;
    return newObj;
  },
  versionKey: false,
});

export default model<IBrand>('Brand', brandSchema);
