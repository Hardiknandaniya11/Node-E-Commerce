import { Request, Response } from "express";
import logger from "../utils/Logger";
import { ApiResponseCode } from "../config/Constant";
import ProductService from "../service/ProductService";
const { CommonResponseCode, ProductResponseCode } = ApiResponseCode



class Product {

    private ProductService: ProductService = new ProductService();

    create = async (req: Request, res: Response) => {
        try {

            let createProduct = await this.ProductService.createProduct(req.body);
            if (!createProduct) {
                res.status(200).json({ status: false, message: "Failed to create Product" });
            }
            res.status(201).json({ status: true, statusCode: CommonResponseCode.success, data: createProduct });

        } catch (error: any) {
            logger.error("*** ProductController create *** catch ERROR => " + error.stack)
            res.status(500).json(CommonResponseCode.serverError)
        }
    }

    update = async (req: Request, res: Response) => {
        try {

            let updateProduct = await this.ProductService.updateProduct(req.body.productId, req.body)

            if (!updateProduct) {
                res.status(200).json(ProductResponseCode.failedToUpdate)
            }
            res.status(200).json(updateProduct)

        } catch (error: any) {
            logger.error("*** ProductController update *** catch ERROR => " + error.stack)
            res.status(500).json(CommonResponseCode.serverError)
        }
    }

    delete = async (req: Request, res: Response) => {
        try {

            console.log("inside controller delete")
            let deleteProduct = await this.ProductService.deleteProduct(req.body.productId)

            if (!deleteProduct) {
                res.status(200).json(ProductResponseCode.failedToDelete)
            }
            res.status(200).json({ status: true, statusCode: CommonResponseCode.success })

        } catch (error: any) {
            logger.error("*** ProductController delete *** catch ERROR => " + error.stack)
            res.status(500).json(CommonResponseCode.serverError)
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {

            let getAllProduct = await this.ProductService.getAllProduct(req.body.search)

            console.log("*** inside the getAll controller")
            if (!getAllProduct || (Array.isArray(getAllProduct) && getAllProduct.length == 0)) {
                res.status(200).json(ProductResponseCode.notFound)
            }
            res.status(200).json({ status: true, statusCode: CommonResponseCode.success, data: getAllProduct })

        } catch (error: any) {
            logger.error("*** ProductController getAll *** catch ERROR => " + error.stack)
            res.status(500).json(CommonResponseCode.serverError)
        }
    }

    getSingle = async (req: Request, res: Response) => {
        try {

            console.log("inside get single => " + req.body.userId)

            let getProduct = await this.ProductService.getSingleProduct(req.body.productId)

            if (!getProduct) {
                res.status(200).json(ProductResponseCode.notFound)
            }
            res.status(200).json({ status: true, statusCode: CommonResponseCode.success, data: getProduct })

        } catch (error: any) {
            logger.error("*** ProductController getSingle *** catch ERROR => " + error.stack)
            res.status(500).json(CommonResponseCode.serverError)
        }
    }

    createImages = async (req: Request, res: Response) => {
        try {

            let createProductImages = await this.ProductService.createProductImages(req.body.productId, req.body.productImageUrls)
            
            if (!createProductImages) {
                res.status(200).json({ status: false, message: "Failed to create Product images" });
            }
            res.status(201).json({ status: true, statusCode: CommonResponseCode.success, data: createProductImages });
            
        } catch (error: any) {
            logger.error("*** ProductController createImages *** catch ERROR => " + error.stack)
            res.status(500).json(CommonResponseCode.serverError)
            
        }
    }

    deleteImages = async (req: Request, res: Response) => {
        try {

            let deleteProductImages = await this.ProductService.deleteProductImage(req.body.productImageIds)

            if (!deleteProductImages) {
                res.status(200).json(ProductResponseCode.failedToDelete)
            }
            res.status(200).json({ status: true, statusCode: CommonResponseCode.success })
            
        } catch (error: any) {
            logger.error("*** ProductController deleteImages *** catch ERROR => " + error.stack)
            res.status(500).json(CommonResponseCode.serverError)
            
        }
    }

    getImagesByProduct = async (req: Request, res: Response) => {
        try {

            let getProductImages = await this.ProductService.getProductImagesByProduct(req.body.productId)

            if (!getProductImages || (Array.isArray(getProductImages) && getProductImages.length == 0)) {
                res.status(200).json(ProductResponseCode.notFound)
            }
            res.status(200).json({ status: true, statusCode: CommonResponseCode.success, data: getProductImages })
            
        } catch (error: any) {
            logger.error("*** ProductController getImagesByProduct *** catch ERROR => " + error.stack)
            res.status(500).json(CommonResponseCode.serverError)
        }
    }
}

export default Product;
