import Joi from "joi"
import { USER_TYPE, USER_STATUS } from "../config/Constant";

const latLong = Joi.array().items(Joi.number().min(-90).max(90), Joi.number().min(-180).max(180)).length(2)
const password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
let hashtag = Joi.array().items(Joi.string().pattern(/^#/, { name: 'hashtag' })) // Ensures tags start with '#'
let mongoObjectId =  Joi.string().pattern(/^[0-9a-fA-F]{24}$/, { name: 'ObjectId' })


// UserController validation schema

export const userRegistration = Joi.object({
    userName: Joi.string().required(),
    userEmail: Joi.string().email().required(),
    userPhone: Joi.string().required(),
    userPassword: password.required(),
    userType: Joi.number().valid(USER_TYPE.admin, USER_TYPE.vendor, USER_TYPE.customer).required(),
    userProfileImage: Joi.string().required(),
    userStatus: Joi.number().valid(USER_STATUS.active, USER_STATUS.inactive).required(),
    userAddresses: Joi.array().items(Joi.object({
        address: Joi.string().required(),
        lat_long: latLong,
        address_type: Joi.string().valid("home", "office")
    }).strict()).required()
}).unknown().strict()

export const userLogin = Joi.object({
    userEmail: Joi.string().email().required(),
    userPassword: password.required()
}).unknown().strict()

export const getAllUser = Joi.object({
    userId: mongoObjectId.required()
}).unknown().strict()

export const getSingle = Joi.object({
    userId: mongoObjectId.required()
}).unknown().strict()

export const deleteUser = Joi.object({
    userId: mongoObjectId.required()
}).unknown().strict()

export const updateUser = Joi.object({
    userId: mongoObjectId.required(),
    userName: Joi.string().optional(),
    userPassword: Joi.string().optional(),
    userProfileImage: Joi.string().optional(),
    userAddresses: Joi.array().items(Joi.object({
        address: Joi.string().required(),
        lat_long: latLong,
        address_type: Joi.string().valid("home", "office")
    }).strict()).optional()
}).unknown().strict()


// CategoryController validation schema

export const createCategory = Joi.object({
    userId: mongoObjectId.required(),
    categoryName: Joi.string().required(),
    categoryDescription: Joi.string().required(),
    categoryTags: hashtag.required()
}).unknown().strict()

export const updateCategory = Joi.object({
    userId: mongoObjectId.required(),
    categoryId: mongoObjectId.required(),
    categoryName: Joi.string().optional(),
    categoryDescription: Joi.string().optional(),
    categoryTags: hashtag.optional()
}).unknown().strict()

export const deleteCategory = Joi.object({
    userId: Joi.string().required(),
    categoryId: Joi.string().required(),
}).unknown().strict()

export const getAllCategories = Joi.object({
    userId: mongoObjectId.required(),
    search: Joi.string().required().allow(""),
}).unknown().strict()

export const getSingleCategory = Joi.object({
    userId: mongoObjectId.required(),
    categoryId: mongoObjectId.required(),
}).unknown().strict()

// ProductController validation schema

export const createProduct = Joi.object({
    userId: mongoObjectId.required(),
    categoryId: mongoObjectId.required(),
    productName: Joi.string().required(),
    productDescription: Joi.string().required(),
    productPrice: Joi.number().required(),
    productThumbnail: Joi.string().required(),
    productTotalQuantity: Joi.number().required(),
    productTags: hashtag.required()
}).unknown().strict()

export const updateProduct = Joi.object({
    userId: mongoObjectId.required(),
    productId: mongoObjectId.required(),
    productName: Joi.string().optional(),
    productDescription: Joi.string().optional(),
    productPrice: Joi.number().optional(),
    productThumbnail: Joi.string().optional(),
    productTotalQuantity: Joi.number().optional(),
    productTags: hashtag.optional()
}).unknown().strict()

export const deleteProduct = Joi.object({
    userId: Joi.string().required(),
    productId: Joi.string().required(),
}).unknown().strict()

export const getAllProduct = Joi.object({
    userId: mongoObjectId.required(),
    search: Joi.string().required().allow(""),
}).unknown().strict()

export const getSingleProduct = Joi.object({
    userId: mongoObjectId.required(),
    productId: mongoObjectId.required(),
}).unknown().strict()