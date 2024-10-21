import { IUser } from "../model/User";
import Encryption from '../utils/Encryption';
import UserRepository from '../repository/UserRepository';

class UserService {

    private encryption: Encryption = new Encryption()
    private userRepository: UserRepository = new UserRepository()
    async register(user: IUser): Promise<any> {

        const { name, email, phone, type, profile_image, status, addresses, password } = user;

        const hashedPassword = await this.encryption.encryptPassword(password);

            let createObj: IUser = {
                name,
                email,
                phone,
                type,
                profile_image,
                status,
                addresses,
                password: hashedPassword
            }

            let createUser = await this.userRepository.createUser(createObj)

            let responseData = {
                userName: createUser.name,
                userEmail: createUser.email,
                userPhone: createUser.phone,
                userType: createUser.type,
                profileImage: createUser.profile_image,
                userStatus: createUser.status,
                userAddresses: createUser.addresses,
            }
            return responseData
    }
}

export default UserService