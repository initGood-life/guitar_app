import type { Document, Types } from 'mongoose';

// brand interface definition
export interface IBrand extends Document {
  product: Types.ObjectId[];
  name: string;
  description: string;
  website: string
}

