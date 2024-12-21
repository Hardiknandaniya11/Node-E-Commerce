import { Request, Response } from "express";
import logger from "../utils/Logger";
import UserService from "../service/UserService";
import { ApiResponseCode } from "../config/Constant";
const { CommonResponseCode, UserResponseCode } = ApiResponseCode

class User {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  register = async (req: Request, res: Response) => {
    try {
      let createUser = await this.userService.registerUser(req.body);
      if (!createUser) {
        res.status(200).json({ status: false, message: "Failed to register user" });
      }
      res.status(201).json({ status: true, statusCode: CommonResponseCode.success, data: createUser });
    } catch (error: any) {
      logger.error(`*** UserController register *** catch ERROR => ${error.stack}`);
      res.status(500).json(CommonResponseCode.serverError);
    }
  };

  login = async (req: Request, res: Response) => {
    try {

      let params = req.body

      let loginUser = await this.userService.login(params.userEmail, params.userPassword)

      if (!loginUser) {
        res.status(200).json({ status: false, message: "Failed to login user" });
      }

      res.status(200).json({ status: true, statusCode: CommonResponseCode.success, data: loginUser })
    } catch (error: any) {
      logger.error(`*** UserController login *** catch ERROR => ${error.stack}`)
      res.status(500).json(CommonResponseCode.serverError)
    }
  }

  getAll = async (req: Request, res: Response) => {
    try {

      let getAllUsers = await this.userService.getAllUsers()

      console.log("*** inside the getAll controller")
      if (!getAllUsers || (Array.isArray(getAllUsers) && getAllUsers.length == 0)) {
        res.status(200).json(UserResponseCode.notFound)
      }
      res.status(200).json({ status: true, statusCode: CommonResponseCode.success, data: getAllUsers })

    } catch (error: any) {
      logger.error(`*** UserController register *** catch ERROR => ${error.stack}`)
      res.status(500).json(CommonResponseCode.serverError)
    }
  }

  getSingle = async (req: Request, res: Response) => {
    try {

      console.log("inside get single => " + req.body.userId)

      let getUser = await this.userService.getSingleUser(req.body.userId)

      if (!getUser) {
        res.status(200).json(UserResponseCode.notFound)
      }
      res.status(200).json({ status: true, statusCode: CommonResponseCode.success, data: getUser })
      
    } catch (error: any) {
      logger.error(`*** UserController register *** catch ERROR => ${error.stack}`)
      res.status(500).json(CommonResponseCode.serverError)
    }
  }

  delete = async (req: Request, res: Response) => {
    try {

      console.log("inside controller delete")
      let deleteUser = await this.userService.deleteUser(req.body.userId)

      if (!deleteUser) {
        res.status(200).json(UserResponseCode.failedToDelete)
      }
      res.status(200).json({ status: true, statusCode: CommonResponseCode.success })

    } catch (error: any) {
      logger.error(`*** UserController delete *** catch ERROR => ${error.stack}`)
      res.status(500).json(CommonResponseCode.serverError)
    }
  }

  update = async (req: Request, res: Response) => {
    try {
      
      let updateUser = await this.userService.updateUser(req.body.userId, req.body)

      if (!updateUser) {
        res.status(200).json(UserResponseCode.failedToUpdate)
      }
      res.status(200).json(updateUser)
    } catch (error: any) {
      logger.error(`*** UserController update *** catch ERROR => ${error.stack}`)
      res.status(500).json(CommonResponseCode.serverError)
    }
  }
}

export default User;
