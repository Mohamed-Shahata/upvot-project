import jwt from "jsonwebtoken";
import User from "../../DB/models/user.model.js";

export const auth = () => {
    return async (req, res, next) => {
        try {
            const { accesstoken } = req.headers;
            if (!accesstoken) return next(new Error("please login first", { cause: 400 }));

            if (!accesstoken.startsWith(process.env.TOKEN_PREFIX)) return next(new Error("invalid token prifex"));

            const token = accesstoken.split(process.env.TOKEN_PREFIX)[1];

            const decoded = jwt.verify(token, process.env.LOGIN_SIGNATURE);

            if (!decoded || !decoded.id) return next(new Error("invalid token payload", { cause: 400 }));

            //check user
            const user = await User.findById(decoded.id, "username email _id");
            if (!user) return next(new Error("please signUp first", { cause: 404 }));

            req.authUser = user;
            next();
        } catch (error) {
            next(new Error("catch error in auth middleware", { cause: 500 }))
        }
    }
}