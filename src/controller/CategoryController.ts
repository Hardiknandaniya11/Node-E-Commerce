import { Request, Response } from "express";
import logger from "../utils/Logger";
import { ApiResponseCode } from "../config/Constant";
import CategoryService from "../service/CategoryService";
const { CommonResponseCode, CategoryResponseCode } = ApiResponseCode



class Categories {

    private categoryService: CategoryService = new CategoryService();

    create = async (req: Request, res: Response) => {
        try {

            let createCategory = await this.categoryService.createCategory(req.body);
            if (!createCategory) {
                res.status(200).json({ status: false, message: "Failed to create category" });
            }
            res.status(201).json({ status: true, statusCode: CommonResponseCode.success, data: createCategory });

        } catch (error: any) {
            logger.error("*** CategoriesController create *** catch ERROR => " + error.stack)
            res.status(500).json(CommonResponseCode.serverError)
        }
    }

    update = async (req: Request, res: Response) => {
        try {

            let updateCategory = await this.categoryService.updateCategory(req.body.categoryId, req.body)

            if (!updateCategory) {
                res.status(200).json(CategoryResponseCode.failedToUpdate)
            }
            res.status(200).json(updateCategory)

        } catch (error: any) {
            logger.error("*** CategoriesController update *** catch ERROR => " + error.stack)
        }
    }

    delete = async (req: Request, res: Response) => {
        try {

            console.log("inside controller delete")
            let deleteCategory = await this.categoryService.deleteCategory(req.body.categoryId)

            if (!deleteCategory) {
                res.status(200).json(CategoryResponseCode.failedToDelete)
            }
            res.status(200).json({ status: true, statusCode: CommonResponseCode.success })

        } catch (error: any) {
            logger.error("*** CategoriesController delete *** catch ERROR => " + error.stack)
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {

            let getAllCategories = await this.categoryService.getAllCategory()

            console.log("*** inside the getAll controller")
            if (!getAllCategories || (Array.isArray(getAllCategories) && getAllCategories.length == 0)) {
                res.status(200).json(CategoryResponseCode.notFound)
            }
            res.status(200).json({ status: true, statusCode: CommonResponseCode.success, data: getAllCategories })

        } catch (error: any) {
            logger.error("*** CategoriesController getAll *** catch ERROR => " + error.stack)
        }
    }

    getsingle = async (req: Request, res: Response) => {
        try {

            console.log("inside get single => " + req.body.userId)

            let getCategory = await this.categoryService.getSingleCategory(req.body.categoryId)

            if (!getCategory) {
                res.status(200).json(CategoryResponseCode.notFound)
            }
            res.status(200).json({ status: true, statusCode: CommonResponseCode.success, data: getCategory })

        } catch (error: any) {
            logger.error("*** CategoriesController getsingle *** catch ERROR => " + error.stack)
        }
    }
}

export default Categories;
