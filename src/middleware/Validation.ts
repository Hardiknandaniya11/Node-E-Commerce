import { NextFunction, Request, Response } from "express";
import logger from "../utils/Logger";
import {ApiResponseCode} from "../config/Constant";
const { CommonResponseCode } = ApiResponseCode

export = (validationSchema: any) => {

    return (req: Request, res: Response, next: NextFunction) => {

        try {

            const { error, value } = validationSchema.validate(req.body)

            if (error) {
                console.log("Validation Error:", error.details[0].message);
                res.status(422).json(error.details[0].message)
            } else {
                console.log("Validation Success:", value);
                next()
            }
            
        } catch (error: any) {
            logger.error("*** VALIDATION CATCH ERROR *** => " + error.stack)
            res.status(500).json(CommonResponseCode.serverError)
        }
    }
}