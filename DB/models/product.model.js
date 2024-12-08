import { Schema, model } from "mongoose";

const productSchema = new Schema({
  title: { type: String, required: true, trim: true },
  caption: { type: String, trim: true, default: "No caption" },
  addedBy: { type: Schema.Types.ObjectId, ref: "User", require: true },
  likesNumber: { type: Number, default: 0, min: 0 },
  images: [{
    secure_url: { type: String, required: true },
    public_id: { type: String, required: true, unique: true },
    folder_id: { type: String, required: true, unique: true }
  }],

}, { timestamps: true })

const Product = model("Product", productSchema);
export default Product;