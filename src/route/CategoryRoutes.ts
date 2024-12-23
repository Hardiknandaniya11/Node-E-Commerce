import express, { Application, NextFunction, Request, Response, Router } from 'express'
const router: Router = express.Router();
import Category from '../controller/CategoryController' 
import Authentication from "../middleware/Auth"
import Validation from "../middleware/Validation"
import { getSingleCategory, getAllCategories, deleteCategory, updateCategory, createCategory } from "../middleware/ValidationSchema"

const categoryController = new Category()
const authentication = new Authentication()

router.post('/create', authentication.auth, Validation(createCategory), categoryController.create);
router.patch('/update', authentication.auth, Validation(updateCategory), categoryController.update);
router.delete('/delete', authentication.auth, Validation(deleteCategory), categoryController.delete);
router.post('/get/all', authentication.auth, Validation(getAllCategories), categoryController.getAll);
router.post('/get/single', authentication.auth, Validation(getSingleCategory), categoryController.getSingle);


export default router