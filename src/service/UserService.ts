import { IUser, UserDto } from "../model/User";
import Encryption from '../utils/Encryption';
import UserRepository from '../repository/UserRepository';
import logger from "../utils/Logger";
import jwt from "jsonwebtoken"
import {ApiResponseCode, tokenSecret} from "../config/Constant";
const { CommonResponseCode, UserResponseCode } = ApiResponseCode

class UserService {

    protected encryption: Encryption = new Encryption()
    protected userRepository: UserRepository = new UserRepository()

    public async registerUser(user: UserDto): Promise<any> {

        const { userName, userEmail, userPhone, userType, userProfileImage, userStatus, userAddresses, userPassword } = user;

        const findExistingUser = await this.userRepository.findUserByEmail(userEmail)

        if(findExistingUser) {
            return UserResponseCode.alreadyExist
        }

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

    public async login(userEmail: string, userPassword: string) {

        const findExistingUser = await this.userRepository.findUserByEmail(userEmail)

        if(!findExistingUser || !findExistingUser._id) {
            return UserResponseCode.notFound
        }

        const comparePassword = await this.encryption.comparePassword(userPassword, findExistingUser.password);

        if(!comparePassword) {
            return CommonResponseCode.notAuthorized
        }

        let token = jwt.sign({
            userId: findExistingUser._id, userEmail: findExistingUser.email
        }, tokenSecret);

        let tokenArr = token.split(".")
        let resultArr = tokenArr[2]

        let updateTokenInUser = await this.userRepository.updateUser( findExistingUser._id ,{token: resultArr})

        return {token: token}
    }

    public async getAllUsers(): Promise<UserDto[] | [] | false> {

        let getUsers = await this.userRepository.getAllUsers()

        if (!getUsers) {
            return UserResponseCode.notFound
        }

        let userResponse = getUsers.map(user => {
            console.log(user)
            return {
                userId: user._id,
                userName: user.name,
                userEmail: user.email,
                userPhone: user.phone,
                userPassword: user.password,
                userType: user.type,
                userProfileImage: user.profile_image,
                userStatus: user.status,
                userAddresses: user.addresses,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
              }
        })

        return userResponse
    }
}

export default UserService