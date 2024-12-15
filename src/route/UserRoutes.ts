import express, { Application, NextFunction, Request, Response, Router } from 'express'
const router: Router = express.Router();
import User from '../controller/UserController' 
import Authentication from "../middleware/Auth"

const userController = new User()
const authentiacation = new Authentication()

router.post('/create', userController.register);
router.post('/login', userController.login);
router.get('/get/all', authentiacation.auth, userController.getAll);

export default router