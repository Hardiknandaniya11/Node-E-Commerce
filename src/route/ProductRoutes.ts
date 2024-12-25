import express, { Router } from 'express'
const router: Router = express.Router();
import Product from '../controller/ProductController' 
import Authentication from "../middleware/Auth"
import Validation from "../middleware/Validation"
import { getSingleProduct, getAllProduct, deleteProduct, updateProduct, createProduct } from "../middleware/ValidationSchema"

const productController = new Product()
const authentication = new Authentication()

router.post('/create', authentication.auth, Validation(createProduct), productController.create);
router.patch('/update', authentication.auth, Validation(updateProduct), productController.update);
router.delete('/delete', authentication.auth, Validation(deleteProduct), productController.delete);
router.post('/get/all', authentication.auth, Validation(getAllProduct), productController.getAll);
router.post('/get/single', authentication.auth, Validation(getSingleProduct), productController.getSingle);


export default router