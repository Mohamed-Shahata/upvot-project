
import { customAlphabet } from "nanoid";

const genrateUniqueString = (length) => {
  const nanoid = customAlphabet("123456msdfg", length || 13); // select alphabet for image + size of chracter
  return nanoid()
}

export default genrateUniqueString