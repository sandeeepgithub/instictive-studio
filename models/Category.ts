/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  attributeSchema: Record<string, any>;
  uid: string;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  attributeSchema: { type: Schema.Types.Mixed, required: true },
  uid: { type: String, required: true },
});

export default mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);
