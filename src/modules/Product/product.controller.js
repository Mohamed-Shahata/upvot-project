import Likes from "../../../DB/models/likes.modek.js";
import Product from "../../../DB/models/product.model.js";
import User from "../../../DB/models/user.model.js";
import genrateUniqueString from "../../utils/genrateUniqueString.js";

//create product
export const addProduct = async (req, res, next) => {
  const { title, caption, addedBy } = req.body;

  if (!title || !addedBy) {
    return next(new Error("Title, addedBy are requiered", { cause: 401 }))
  }
  console.log(req.files)
  const images = req.files.map(file => ({
    secure_url: file.path,
    public_id: genrateUniqueString(10) + "_" + file.originalname.split(".")[0],
    folder_id: file.filename.split("/")[0]
  }))

  const newProduct = await Product.create({ title, caption, addedBy, images })
  return res.status(201).json({ message: "created successfully", newProduct });

}

export const addLikeOrUnlikeProduct = async (req, res, next) => {
  const { userId } = req.body;
  const { productId } = req.params;

  const productExsits = await Product.findById(productId)
  //check product exsits
  if (!productExsits) return next(new Error("Product not found", { cause: 404 }))

  const userExsits = await User.findById(userId)
  //check user exsits
  if (!userExsits) return next(new Error("User not found", { cause: 404 }))


  let likeExsits = await Likes.findOne({ user_id: userExsits._id, product_id: productExsits._id })
  if (likeExsits) {
    await Likes.findByIdAndDelete(likeExsits._id, { new: true });
    productExsits.likesNumber--;
    await productExsits.save();
    return res.status(200).json({ message: "Unliked successfully" });
  }

  likeExsits = await Likes.create({
    product_id: productExsits._id,
    user_id: userExsits._id
  })
  productExsits.likesNumber++;
  await productExsits.save();
  res.status(200).json({ message: "liked successfully" });
}

export const getLikesProduct = async (req, res, next) => {
  const { productId } = req.body;

  const productExsits = await Product.findById(productId)
  //check product exsits
  if (!productExsits) return next(new Error("Product not found", { cause: 404 }))

  res.status(200).json({ message: "likes product is: " + productExsits.likesNumber })
}

