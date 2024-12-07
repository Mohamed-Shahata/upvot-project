// import multer from "multer";
// import genrateUniqueString from "../utils/genrateUniqueString.js";
// import { allowedExtensions } from "../utils/allowedExtensions.js";
// import fs from "fs";
// import path from "path";

// export const multerMiddleware = ({
//   extensions = allowedExtensions.image,
//   filePath = "general"
// }) => {

//   const destinationPath = path.resolve(`src/uploads/${filePath}`);

//   //path check
//   if (!fs.existsSync(destinationPath)) {
//     fs.mkdirSync(destinationPath, { recursive: true })
//   }

//   // const memoryStorage = multer.memoryStorage()
//   //diskStorage
//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, destinationPath)
//     },
//     filename: (req, file, cb) => {
//       const uniqueFileName = genrateUniqueString(6) + "-" + file.originalname
//       cb(null, uniqueFileName)
//     }
//   })

//   //file filter
//   const fileFilter = (req, file, cb) => {
//     if (extensions.includes(file.mimetype.split("/")[1]))
//       return cb(null, true)

//     cb(new Error("Image formate is not allowed!"), false)
//   }


//   const file = multer({ fileFilter, storage });
//   return file
// }
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../../config/cloudinary.js";

export const cloudinaryUploader = ({ folderName = "users" }) => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: folderName,
      allowed_formats: ["jpeg", "png", "jpg"]
    }
  })
  const upload = multer({ storage })
  return upload;
}



