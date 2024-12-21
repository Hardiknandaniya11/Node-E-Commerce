import Joi from "joi"
import { USER_TYPE, USER_STATUS } from "../config/Constant";

export const userRegistration = Joi.object({
    userName: Joi.string().required(),
    userEmail: Joi.string().email().required(),
    userPhone: Joi.string().required(),
    userPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    userType: Joi.number().valid(USER_TYPE.admin, USER_TYPE.vendor, USER_TYPE.customer).required(),
    userProfileImage: Joi.string().required(),
    userStatus: Joi.number().valid(USER_STATUS.active, USER_STATUS.inactive).required(),
    userAddresses: Joi.array().items(Joi.object({
        address: Joi.string().required(),
        lat_long: Joi.array().items(Joi.number().min(-90).max(90), Joi.number().min(-180).max(180)).length(2),
        address_type: Joi.string().valid("home", "office")
    }).strict()).required()
}).unknown().strict()

export const userLogin = Joi.object({
    userEmail: Joi.string().email().required(),
    userPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
}).unknown().strict()

export const getAllUser = Joi.object({
    userId: Joi.string().required()
}).unknown().strict()

export const getSingle = Joi.object({
    userId: Joi.string().required()
}).unknown().strict()

export const deleteUser = Joi.object({
    userId: Joi.string().required()
}).unknown().strict()

export const updateUser = Joi.object({
    userId: Joi.string().required(),
    userName: Joi.string().optional(),
    userPassword: Joi.string().optional(),
    userProfileImage: Joi.string().optional(),
    userAddresses: Joi.array().items(Joi.object({
        address: Joi.string().required(),
        lat_long: Joi.array().items(Joi.number().min(-90).max(90), Joi.number().min(-180).max(180)).length(2),
        address_type: Joi.string().valid("home", "office")
    }).strict()).optional()
}).unknown().strict()