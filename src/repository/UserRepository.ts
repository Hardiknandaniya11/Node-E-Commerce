import { User, IUser } from '../model/User';
import logger from '../utils/Logger';

class UserRepository {


    async createUser(userData: IUser): Promise<IUser | false> {
        try {

            const user = new User(userData);
            let createUser: IUser | false = await user.save().then((result: IUser) => {
                return result
            }).catch((error: any) => {
                logger.error(`*** UserRepository CreateUser *** ERROR => ${error}`)
                return false
            })

            return createUser

        } catch (error: any) {
            logger.error(`*** UserRepository CreateUser *** catch ERROR => ${error.stack}`)
            return false
        }
    }

    async getAllUsers(): Promise<IUser[] | [] | false> {
        try {

            let getUser: IUser[] | [] | false = await User.find().then((result: IUser[] | []) => {
                return result
            }).catch((error: any) => {
                logger.error(`*** UserRepository getAllUsers *** ERROR => ${error}`)
                return false
            })

            return getUser

        } catch (error: any) {
            logger.error(`*** UserRepository getAllUsers *** catch ERROR => ${error.stack}`)
            return false
        }
    }

    async findUserByEmail(email: string): Promise<IUser | null | false> {
        try {

            let getUser: IUser | null | false = await User.findOne({ email }).then((result: IUser | null) => {
                return result
            }).catch((error: any) => {
                logger.error(`*** UserRepository findUserByEmail *** ERROR => ${error}`)
                return false
            })

            return getUser

        } catch (error: any) {
            logger.error(`*** UserRepository findUserByEmail *** catch ERROR => ${error.stack}`)
            return false
        }
    }

    async updateUser(userId: string, updateData: Partial<IUser>): Promise<IUser | null | false> {
        try {

            let update: IUser | null | false = await User.findByIdAndUpdate(userId, updateData, { new: true }).then((result: IUser | null) => {
                return result
            }).catch((error: any) => {
                logger.error(`*** UserRepository updateUser *** ERROR => ${error}`)
                return false
            });

            return update

        } catch (error: any) {
            logger.error(`*** UserRepository updateUser *** catch ERROR => ${error.stack}`)
            return false
        }
    }

    async deleteUser(userId: string): Promise<boolean> {
        try {

            let deleteUser = await User.findByIdAndDelete(userId).then((result: any) => {
                return true
            }).catch((error: any) => {
                logger.error(`*** UserRepository deleteUser *** ERROR => ${error}`)
                return false
            });

            return deleteUser

        } catch (error: any) {
            logger.error(`*** UserRepository deleteUser *** catch ERROR => ${error.stack}`)
            return false
        }
    }

    async findUserById(userId: string): Promise<IUser | null | false> {
        try {

            let getUser: IUser | null | false = await User.findById(userId).then((result: IUser | null) => {
                return result
            }).catch((error: any) => {
                logger.error(`*** UserRepository findUserById *** ERROR => ${error}`)
                return false
            })

            return getUser
        } catch (error: any) {
            logger.error(`*** UserRepository findUserById *** catch ERROR => ${error.stack}`)
            return false
        }
    }

}

export default UserRepository;