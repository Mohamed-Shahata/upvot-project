import Product from "../../../DB/models/product.model.js";
import User from "../../../DB/models/user.model.js";

//create product
export const addProduct = async (req, res, next) => {
  const { title, caption, price, addedBy } = req.body;

  if (!title || !price || !addedBy) {
    return next(new Error("Title, price and addedBy are requiered", { cause: 401 }))
  }


  const images = req.files.map(file => ({
    url: file.path,
    public_id: file.filename
  }))

  const newProduct = await Product.create({ title, price, caption, addedBy, images })
  return res.status(201).json({ message: "created successfully", newProduct });

}

export const addLikeOrUnlikeProduct = async (req, res, next) => {
  const { productId, userId } = req.body;

  const productExsits = await Product.findById(productId)
  //check product exsits
  if (!productExsits) return next(new Error("Product not found", { cause: 404 }))

  const userExsits = await User.findById(userId)
  //check user exsits
  if (!userExsits) return next(new Error("User not found", { cause: 404 }))

  if (productExsits.likedBy.includes(userId)) {
    productExsits.likedBy.shift(userId)
    productExsits.likesNumber--
    await productExsits.save()
    return res.status(200).json({ message: "Unliked successfully" });
  }


  productExsits.likedBy.push(userId)
  productExsits.likesNumber++
  await productExsits.save()

  res.status(200).json({ message: "liked successfully" });
}

export const getLikesProduct = async (req, res, next) => {
  const { productId } = req.body;

  const productExsits = await Product.findById(productId)
  //check product exsits
  if (!productExsits) return next(new Error("Product not found", { cause: 404 }))

  res.status(200).json({ message: "likes product is: " + productExsits.likesNumber })
}

