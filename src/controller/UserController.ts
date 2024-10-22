import { Request, Response } from 'express';
import logger from '../utils/Logger';
import UserService from '../service/UserService';
import UserRepository from '../repository/UserRepository';

class User {
    
    private userService: UserService
    constructor() {
        this.userService = new UserService(new UserRepository());
    }

      register = async (req: Request, res: Response) => {
        try {

            let createUser = await this.userService.registerUser(req.body);
            if(!createUser) {
                res.status(200).json({ error: 'Failed to register user'})
            }
            res.status(201).json(createUser);
        } catch (error: any) {
            logger.error(`*** UserController register *** catch ERROR => ${error.stack}`);
            res.status(500).json({ error: 'Failed to register user' });
        }
    }

}

export default User