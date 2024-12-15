import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import UserRepository from '../repository/UserRepository';
import {ApiResponseCode, tokenSecret} from "../config/Constant";
const { CommonResponseCode } = ApiResponseCode

class Authentiacation 
{

    protected userRepository: UserRepository = new UserRepository()

    constructor() {
        this.auth = this.auth.bind(this); // Bind the method
    }

    public async auth(req: Request, res: Response, next: NextFunction):Promise<void> {

        console.log("Hello world")

        let token = req.headers.authorization
        let userId = req.body.userId
        let decodedUserId: string = ""
        let decodedUserEmail: string = ""
        
        if ((!token || token.trim() == '') || !userId) {
             res.status(401).json(CommonResponseCode.notAuthorized)
             return
        }

        let tokenArr = token.split(".")

        jwt.verify(token, tokenSecret, (error, decode) => {
            if (error || !decode) {
                 return res.status(403).json(CommonResponseCode.forbidden)
            }
            console.log("decoded jwt is => " + typeof decode)
            decodedUserId = (typeof decode == "object") ? decode.userId : ""
            decodedUserEmail = (typeof decode == "object") ? decode.userEmail : ""
        })

        if (userId != decodedUserId) {
            res.status(403).json(CommonResponseCode.forbidden)
            return
        }
        const findExistingUser = await this.userRepository.findUserById(userId)

        console.log("inside auth findexisting usr => " + JSON.stringify(findExistingUser))

        if (!findExistingUser) {
            res.status(403).json(CommonResponseCode.forbidden)
            return
        }

        let userToken = findExistingUser.token
        let requestToken = tokenArr[2]

        if ((userToken != requestToken) || (findExistingUser.email != decodedUserEmail)) {
            res.status(403).json(CommonResponseCode.forbidden)
            return
        }

         next()
    }
}

export default Authentiacation