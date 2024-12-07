import { Schema, model } from "mongoose";

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  caption: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    min: 0,
    required: true
  },
  images: [
    {
      url: {
        type: String,
        required: true
      },
      public_id: {
        type: String,
        required: true
      }
    }
  ],
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true
  },
  likedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  likesNumber: {
    type: Number,
    default: 0
  }
}, { timestamps: true })

const Product = model("Product", productSchema);
export default Product;