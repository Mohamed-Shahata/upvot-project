
import Joi from "joi";

export const signUpSchema = {
    body: Joi.object({
        username: Joi.string().min(5).max(10).alphanum().required().messages({ 'any.required': 'please enter your username' }),
        email: Joi.string().email({ tlds: { allow: ["com", "org", "yahoo"] }, minDomainSegments: 1 }),
        password: Joi.string(),
        cpass: Joi.string().valid(Joi.ref("password")),
        age: Joi.number().min(15).max(100),
        gender: Joi.string().valid("male", "female")
    })//.options({ presence: "required" })
        .with("password", "cpass").with("email", "password")
}