import { User, IUser } from '../model/User';
import logger from '../utils/logger';

class UserRepository {


    async createUser(userData: IUser): Promise< any | false> {

        const user = new User(userData);
        await user.save().then((result: unknown | null) => {
            return  result 
        }).catch((error: any) => {
            logger.error(`*** UserRepository CreateUser *** ERROR => ${error}`)
            return false 
        })
    }

    async getAllUsers() {

        await User.find().then((result: IUser[] | []) => {
            return { status: true, data: result }
        }).catch((error: any) => {
            logger.error(`*** UserRepository getAllUsers *** ERROR => ${error}`)
            return { status: false }
        })

    }

    async findUserByEmail(email: string) {

        await User.findOne({ email }).then((result: IUser | null) => {
            return { status: true, data: result }
        }).catch((error: any) => {
            logger.error(`*** UserRepository findUserByEmail *** ERROR => ${error}`)
            return { status: false }
        })
    }

    async updateUser(userId: string, updateData: Partial<IUser>){
         await User.findByIdAndUpdate(userId, updateData, { new: true }).then((result: IUser | null) => {
            return { status: true, data: result }
        }).catch((error: any) => {
            logger.error(`*** UserRepository updateUser *** ERROR => ${error}`)
            return { status: false }
        });
    }

    async deleteUser(userId: string) {
         await User.findByIdAndDelete(userId).then((result: any) => {
            return { status: true, data: result }
        }).catch((error: any) => {
            logger.error(`*** UserRepository deleteUser *** ERROR => ${error}`)
            return { status: false }
        });
    }

    async findUserById(userId: string) {

        await User.findById(userId).then((result: IUser | null) => {
            return { status: true, data: result }
        }).catch((error: any) => {
            logger.error(`*** UserRepository findUserById *** ERROR => ${error}`)
            return { status: false }
        })
    }

}

export default UserRepository;