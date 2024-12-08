import { Schema, model } from "mongoose"

const likesSchema = new Schema({
  product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true })

const Likes = model("Likes", likesSchema);
export default Likes;