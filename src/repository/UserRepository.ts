import { User, IUser } from '../model/User';
import logger from '../utils/Logger';

class UserRepository {


    async createUser(userData: IUser): Promise< IUser | false> {

        const user = new User(userData);
       let createUser: IUser | false = await user.save().then((result: IUser) => {
            return  result 
        }).catch((error: any) => {
            logger.error(`*** UserRepository CreateUser *** ERROR => ${error}`)
            return false 
        })

        return createUser
    }

    async getAllUsers(): Promise<IUser[] | [] | false> {

       let getUser: IUser[] | [] | false = await User.find().then((result: IUser[] | []) => {
            return  result 
        }).catch((error: any) => {
            logger.error(`*** UserRepository getAllUsers *** ERROR => ${error}`)
            return false 
        })

        return getUser
    }

    async findUserByEmail(email: string):  Promise<IUser | null | false>{

        let getUser: IUser | null | false = await User.findOne({ email }).then((result: IUser | null) => {
            return  result
        }).catch((error: any) => {
            logger.error(`*** UserRepository findUserByEmail *** ERROR => ${error}`)
            return false
        })

        return getUser
    }

    async updateUser(userId: string, updateData: Partial<IUser>): Promise<IUser | null | false> {

        let update: IUser | null | false = await User.findByIdAndUpdate(userId, updateData, { new: true }).then((result: IUser | null) => {
            return result
        }).catch((error: any) => {
            logger.error(`*** UserRepository updateUser *** ERROR => ${error}`)
            return false 
        });

        return update
    }

    async deleteUser(userId: string): Promise<boolean> {

        let deleteUser = await User.findByIdAndDelete(userId).then((result: any) => {
            return true
        }).catch((error: any) => {
            logger.error(`*** UserRepository deleteUser *** ERROR => ${error}`)
            return false
        });

        return deleteUser
    }

    async findUserById(userId: string): Promise<IUser | null | false> {

       let getUser: IUser | null | false = await User.findById(userId).then((result: IUser | null) => {
            return result
        }).catch((error: any) => {
            logger.error(`*** UserRepository findUserById *** ERROR => ${error}`)
            return false
        })

        return getUser
    }

}

export default UserRepository;