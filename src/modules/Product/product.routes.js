import { Router } from "express";
import * as productController from "../Product/product.controller.js";
import expressAsyncHandler from "express-async-handler";
import { cloudinaryUploader } from "../../middlewares/multer.js";



const router = Router();

router.post(
  "/add",
  cloudinaryUploader({ folderName: "products" }).array("images", 5),
  expressAsyncHandler(productController.addProduct)
);
router.post("/:productId/like-toggle", expressAsyncHandler(productController.addLikeOrUnlikeProduct))
router.get("/getlikes", expressAsyncHandler(productController.getLikesProduct))



export default router;
