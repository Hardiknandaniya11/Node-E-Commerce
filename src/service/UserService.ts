import { IUser, UserDto } from "../model/User";
import Encryption from '../utils/Encryption';
import UserRepository from '../repository/UserRepository';
import logger from "../utils/Logger";
import User from "../controller/UserController";

class UserService {

    protected encryption: Encryption = new Encryption()
    protected userRepository: UserRepository

    constructor(repository: UserRepository) {
        this.userRepository = repository
    }
    public async registerUser(user: UserDto): Promise<any> {

        const { userName, userEmail, userPhone, userType, userProfileImage, userStatus, userAddresses, userPassword } = user;

        const hashedPassword = await this.encryption.encryptPassword(userPassword);

            let createObj: IUser = {
                name: userName,
                email: userEmail,
                phone: userPhone,
                type: userType,
                profile_image: userProfileImage,
                status: userStatus,
                addresses: userAddresses,
                password: hashedPassword
            }

            let createUser = await this.userRepository.createUser(createObj)

            if(!createUser) {
                return false
            }

            logger.info(`User service => `, createUser)

            let responseData: UserDto = {
                userId: createUser._id,
                userName: createUser.name,
                userEmail: createUser.email,
                userPhone: createUser.phone,
                userType: createUser.type,
                userProfileImage: createUser.profile_image,
                userPassword: "",
                userStatus: createUser.status,
                userAddresses: createUser.addresses,
                createdAt: createUser.createdAt,
                updatedAt: createUser.updatedAt
            }
            return responseData
    }
}

export default UserService