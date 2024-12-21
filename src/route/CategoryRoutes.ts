import express, { Application, NextFunction, Request, Response, Router } from 'express'
const router: Router = express.Router();
import Category from '../controller/CategoryController' 
import Authentication from "../middleware/Auth"
import Validation from "../middleware/Validation"
import { } from "../middleware/ValidationSchema"

const categoryController = new Category()
const authentiacation = new Authentication()

router.post('/create', categoryController.create);
router.patch('/update', categoryController.update);
router.delete('/delete', categoryController.delete);
router.get('/get/all', categoryController.getAll);
router.post('/get/single', categoryController.getsingle);


export default router