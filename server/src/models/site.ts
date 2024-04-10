import type { ValidatorProps } from 'mongoose';
import { model, Schema } from 'mongoose';
import validator from 'validator';

import type { ISiteModel } from './types/site.types';

const siteSchema = new Schema<ISiteModel>({
  address: {
    type: String,
    required: [true, 'Please provide a address for the site!'],
    trim: true,
    minlength: 3,
    maxlength: 250,
  },
  hours: {
    type: String,
    required: [true, 'Please provide a hours for the site!'],
    trim: true,
    minlength: 3,
    maxlength: 250,
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone for the site!'],
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, 'Please provide a email for the site!'],
    trim: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: (props: ValidatorProps) => `${props.value} is not a valid email`,
    },
  },
});

// change the id to string and remove the __v from the output
siteSchema.set('toJSON', {
  transform: (_document, returnedObj) => {
    const newObj = { ...returnedObj };
    newObj.id = String(newObj._id);
    delete newObj.id;
    return newObj;
  },
  versionKey: false,
});

export default model<ISiteModel>('Site', siteSchema);
