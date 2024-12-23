import express, { Application, NextFunction, Request, Response, Router } from 'express'
const router: Router = express.Router();
import User from '../controller/UserController' 
import Authentication from "../middleware/Auth"
import Validation from "../middleware/Validation"
import { userRegistration, userLogin, getAllUser, deleteUser, updateUser, getSingle } from "../middleware/ValidationSchema"

const userController = new User()
const authentication = new Authentication()

router.post('/create', Validation(userRegistration), userController.register);
router.post('/login', Validation(userLogin), userController.login);
router.get('/get/all', authentication.auth, Validation(getAllUser), userController.getAll);
router.post('/get/single', authentication.auth, Validation(getSingle), userController.getSingle)
router.delete('/delete', authentication.auth, Validation(deleteUser), userController.delete)
router.patch('/update', authentication.auth, Validation(updateUser), userController.update)

export default router