/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IListing extends Document {
  title: string;
  description: string;
  price: number;
  location: string;
  categoryId: Types.ObjectId;
  attributes: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  categoryUid: string;
}

const ListingSchema = new Schema<IListing>(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    attributes: { type: Schema.Types.Mixed, required: true },
    categoryUid: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Listing ||
  mongoose.model<IListing>("Listing", ListingSchema);
