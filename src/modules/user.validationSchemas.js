
import Joi from "joi";


const ageRole = (value, heleprs) => {
    if (value <= 18)
        return heleprs.message("age must be genarter than 18")
    // return heleprs.error("any.invalid")
    // throw new Error("age must be genarter than 18")
    return value
}

export const signUpSchema = {
    body: Joi.object({
        username: Joi.string().min(5).max(10).alphanum().required().messages({
            'any.required': 'please enter your username'
        }),
        email: Joi.string().email({ tlds: { allow: ["com", "org", "yahoo"] }, minDomainSegments: 1 }),
        password: Joi.string(),
        cpass: Joi.string().valid(Joi.ref("password")),
        age: Joi.number().custom(ageRole),
        gender: Joi.string().valid("male", "female")
    })
        // .options({ presence: "required" })
        .with("password", "cpass").with("email", "password")
}