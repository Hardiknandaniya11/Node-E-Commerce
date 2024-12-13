import express, { Application, NextFunction, Request, Response, Router } from 'express'
const router: Router = express.Router();
import User from '../controller/UserController' 

const userController = new User()

router.post('/create', userController.register);
router.post('/login', userController.login);
router.get('/get/all', userController.getAll);

export default router