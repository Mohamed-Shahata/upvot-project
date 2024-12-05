import User from "../../../DB/models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

//================ Sgin Up APIs ==============//
export const sginUpHandler = async (req, res, next) => {
    const { username, email, password, cpass, gender, age } = req.body;

    //email cheked
    const isEmailExists = await User.findOne({ email });
    if (isEmailExists) return next(new Error("Email is already exists", { cause: 409 }));

    //hash password
    const hashPassword = bcryptjs.hashSync(password, +process.env.SALT_ROUNDS);

    const newUser = await User.create({ username, email, password: hashPassword, gender, age });
    return res.status(201).json({ message: "Sign up successfully", newUser });
}

//================ Sgin Up APIs ==============//
export const sginInHandler = async (req, res, next) => {
    const { email, password } = req.body;

    //email cheked
    const user = await User.findOne({ email });
    if (!user) return next(new Error("invalid login creadentials", { cause: 404 }));

    //compar password
    const comparePassword = bcryptjs.compareSync(password, user.password);

    if (!comparePassword)
        return next(new Error("invalid login creadentials", { cause: 404 }));

    //create access token
    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.LOGIN_SIGNATURE,
        {
            expiresIn: "1h",
            // algorithm: "ES256"
        }
    );

    return res.status(200).json({
        message: "Loged in successfully",
        user,
        token
    });
}


export const getUserProfile = async (req, res, next) => {
    res.status(200).json({ message: "User data", data: req.authUser });
}

export const updateAccount = async (req, res, next) => {
    const { username, email, age } = req.body;
    const { _id } = req.authUser;

    if (email) {
        const isEmailExists = await User.findOne({ email });
        if (isEmailExists) return next(new Error("Email is already exists", { cause: 409 }));
    }

    const userUpdate = await User.findByIdAndUpdate(_id, {
        username, email, age
    }, {
        new: true
    });

    if (!userUpdate) return next(new Error("update fail"));

    res.status(200).json({ message: "done", userUpdate });
}

export const deleteAccount = async (req, res, next) => {
    const { _id } = req.authUser;

    const deleteUser = await User.findByIdAndDelete(_id);

    if (!deleteUser) return next(new Error("delete fail"));

    res.status(200).json({ message: "done" });
}