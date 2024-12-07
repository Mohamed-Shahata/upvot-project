import Joi from "joi";

export const addProductValidations = {
  body: Joi.object({
    title: Joi.string().lowercase().required(),
    caption: Joi.string().lowercase().required(),
    price: Joi.number().min(1).required(),
    addedBy: Joi.required()
  })
}