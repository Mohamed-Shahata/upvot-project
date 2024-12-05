import { Router } from "express";
import * as usercontroller from "./user.controller.js";
import expressAsyncHandler from "express-async-handler";
import { auth } from "../../middlewares/auth.middleware.js";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";
import { signUpSchema } from "../user.validationSchemas.js";


const router = Router();

router.post("/" , validationMiddleware(signUpSchema) , expressAsyncHandler(usercontroller.sginUpHandler));
router.post("/login" , expressAsyncHandler(usercontroller.sginInHandler));
router.get("/" , auth() , expressAsyncHandler(usercontroller.getUserProfile));
router.put("/" , auth() , expressAsyncHandler(usercontroller.updateAccount));
router.delete("/" , auth() , expressAsyncHandler(usercontroller.deleteAccount));


export default router;