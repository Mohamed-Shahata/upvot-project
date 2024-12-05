

const reqKeys = ["body" , "params" , "query" , "headers"];
export const validationMiddleware = (schema) => {
    return (req , res , next) => {

        let validationErrorArray = [];
        for (const key of reqKeys) {
            const validationResalt = schema[key]?.validate(req[key] , {abortEarly: false});
            if(validationResalt?.error)
                validationErrorArray.push(...validationResalt.error.details);
        }

        if(validationErrorArray.length)
            return res.status(400).json({
                error_Msg: "validation error",
                errors: validationErrorArray.map(ele => ele.message) 
            })

        next();
    }
}