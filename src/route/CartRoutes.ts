import express, { Router } from 'express'
const router: Router = express.Router();
import Authentication from "../middleware/Auth"
import Validation from "../middleware/Validation"
import { getSingleCart, updateCart } from "../middleware/ValidationSchema"
import Cart from '../controller/CartController';

const authentication = new Authentication()
const cartController = new Cart()

router.patch('/update', authentication.auth, Validation(updateCart), cartController.update);
router.post('/get/single', authentication.auth, Validation(getSingleCart), cartController.getSingle);

export default router