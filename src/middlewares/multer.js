import multer from "multer";
import genrateUniqueString from "../utils/genrateUniqueString.js";
import { allowedExtensions } from "../utils/allowedExtensions.js";
import fs from "fs";
import path from "path";

export const multerMiddleware = ({
  extensions = allowedExtensions.image,
  filePath = "general"
}) => {

  const destination = path.resolve(`uploads/${filePath}`);
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(`uploads/${filePath}`, { recursive: true })
  }

  // const memoryStorage = multer.memoryStorage()
  //diskStorage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destination)
    },
    filename: (req, file, cb) => {
      const uniqueFileName = genrateUniqueString(6) + "-" + file.originalname
      cb(null, uniqueFileName)
    }
  })

  //file filter
  const fileFilter = (req, file, cb) => {
    console.log({ file });
    if (extensions.includes(file.mimetype.split("/")[1]))
      return cb(null, true)

    cb(new Error("Image formate is not allowed!"), false)
  }


  const file = multer({ fileFilter, storage });
  return file
}