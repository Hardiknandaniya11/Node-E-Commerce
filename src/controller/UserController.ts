import { Request, Response } from 'express';
import logger from '../utils/logger';
import Encryption from '../utils/Encryption';
import UserRepository from '../repository/UserRepository';
import UserService from '../service/UserService';
import { IUser } from '../model/User';

class User {
    
    private userService: UserService = new UserService()

    constructor() {

    }

    async register(req: Request, res: Response) {
        try {

            let createUser = await this.userService.register(req.body)
            
            res.status(201).json({ user: createUser });
        } catch (error: any) {
            logger.error(`*** UserController register *** catch ERROR => ${error.stack}`)
            res.status(500).json({ error: 'Failed to register user' });
        }
    }

}

export default User