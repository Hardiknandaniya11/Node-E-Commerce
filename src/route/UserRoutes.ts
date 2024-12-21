import express, { Application, NextFunction, Request, Response, Router } from 'express'
const router: Router = express.Router();
import User from '../controller/UserController' 
import Authentication from "../middleware/Auth"
import Validation from "../middleware/Validation"
import { userRegistration, userLogin, getAllUser, deleteUser, updateUser, getSingle } from "../middleware/ValidationSchema"

const userController = new User()
const authentiacation = new Authentication()

router.post('/create', Validation(userRegistration), userController.register);
router.post('/login', Validation(userLogin), userController.login);
router.get('/get/all', authentiacation.auth, Validation(getAllUser), userController.getAll);
router.post('/get/single', authentiacation.auth, Validation(getSingle), userController.getSingle)
router.delete('/delete', authentiacation.auth, Validation(deleteUser), userController.delete)
router.patch('/update', authentiacation.auth, Validation(updateUser), userController.update)

export default router