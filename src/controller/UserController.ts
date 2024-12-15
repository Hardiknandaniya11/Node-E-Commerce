import { Request, Response } from "express";
import logger from "../utils/Logger";
import UserService from "../service/UserService";
import UserRepository from "../repository/UserRepository";
import {ApiResponseCode} from "../config/Constant";
const { CommonResponseCode, UserResponseCode } = ApiResponseCode

class User {
  private userService: UserService;
  private userRepository: UserRepository;
  constructor() {
    this.userService = new UserService();
    this.userRepository = new UserRepository();
  }

  register = async (req: Request, res: Response) => {
    try {
      let createUser = await this.userService.registerUser(req.body);
      if (!createUser) {
        res.status(200).json({status: false, message: "Failed to register user" });
      }
      res.status(201).json({status: true, statusCode: CommonResponseCode.success, data: createUser });
    } catch (error: any) {
      logger.error(`*** UserController register *** catch ERROR => ${error.stack}`);
      res.status(500).json(CommonResponseCode.serverError);
    }
  };

  login = async (req: Request, res: Response) => {
    try {

        let params = req.body

        let loginUser = await this.userService.login(params.userEmail, params.userPassword)

        if(!loginUser) {
            res.status(200).json({status: false, message: "Failed to login user" });
        }
        
        res.status(200).json({status: true, statusCode: CommonResponseCode.success, data: loginUser })
    } catch (error: any) {
        logger.error(`*** UserController login *** catch ERROR => ${error.stack}`)
        res.status(500).json(CommonResponseCode.serverError)
    }
  }

  getAll = async (req: Request, res: Response) => {
    try {

        let getAllUsers = await this.userService.getAllUsers() 

        console.log("*** inside the getAll controller")
        if(!getAllUsers || (Array.isArray(getAllUsers) && getAllUsers.length == 0)) {
            res.status(200).json(UserResponseCode.notFound)
        }
            res.status(200).json({status: true, statusCode: CommonResponseCode.success, data: getAllUsers })
        
    } catch (error: any) {
        logger.error(`*** UserController register *** catch ERROR => ${error.stack}`)
        res.status(500).json(CommonResponseCode.serverError)
    }
  }
}

export default User;
