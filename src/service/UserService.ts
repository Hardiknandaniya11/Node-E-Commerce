import { IUser, UserDto } from "../model/User";
import Encryption from '../utils/Encryption';
import UserRepository from '../repository/UserRepository';
import logger from "../utils/Logger";
import jwt from "jsonwebtoken"
import moment from "moment"
import { ApiResponseCode, TOKEN_SECRET } from "../config/Constant";
const { CommonResponseCode, UserResponseCode } = ApiResponseCode

class UserService {

    protected encryption: Encryption = new Encryption()
    protected userRepository: UserRepository = new UserRepository()

    public async registerUser(user: UserDto): Promise<any> {
        try {

            const { userName, userEmail, userPhone, userType, userProfileImage, userStatus, userAddresses, userPassword } = user;

            const findExistingUser = await this.userRepository.findUserByEmail(userEmail)

            if (findExistingUser) {
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

            if (!createUser) {
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

        } catch (error: any) {
            logger.error("*** UserService registerUser *** catch ERROR => " + error.stack)
            return false
        }
    }

    public async login(userEmail: string, userPassword: string) {
        try {

            const findExistingUser = await this.userRepository.findUserByEmail(userEmail)

            if (!findExistingUser || !findExistingUser._id) {
                return UserResponseCode.notFound
            }

            const comparePassword = await this.encryption.comparePassword(userPassword, findExistingUser.password);

            if (!comparePassword) {
                return CommonResponseCode.notAuthorized
            }

            let token = jwt.sign({
                userId: findExistingUser._id, userEmail: findExistingUser.email
            }, TOKEN_SECRET);

            let tokenArr = token.split(".")
            let resultArr = tokenArr[2]

            let updateTokenInUser = await this.userRepository.updateUser(findExistingUser._id, { token: resultArr })

            return { token: token }

        } catch (error: any) {
            logger.error("*** UserService login *** catch ERROR => " + error.stack)
            return false
        }
    }

    public async getAllUsers(): Promise<UserDto[] | [] | false> {
        try {

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

        } catch (error: any) {
            logger.error("*** UserService getAllUsers *** catch ERROR => " + error.stack)
            return false
        }
    }

    public async getSingleUser(userId: string): Promise<UserDto | null | false> {
        try {

            let getUsers = await this.userRepository.findUserById(userId)

            if (!getUsers) {
                return UserResponseCode.notFound
            }

            return {
                userId: getUsers._id,
                userName: getUsers.name,
                userEmail: getUsers.email,
                userPhone: getUsers.phone,
                userPassword: getUsers.password,
                userType: getUsers.type,
                userProfileImage: getUsers.profile_image,
                userStatus: getUsers.status,
                userAddresses: getUsers.addresses,
                createdAt: getUsers.createdAt,
                updatedAt: getUsers.updatedAt
            }

        } catch (error: any) {
            logger.error("*** UserService getSingleUser *** catch ERROR => " + error.stack)
            return false
        }
    }

    public async deleteUser(userId: string): Promise<boolean> {
        try {

            console.log("delete user service")
            let findUser = await this.userRepository.findUserById(userId)

            if (!findUser) {
                return UserResponseCode.notFound
            }

            let deleteUser = await this.userRepository.deleteUser(userId)
            return deleteUser

        } catch (error: any) {
            logger.error("*** UserService deleteUser *** catch ERROR => " + error.stack)
            return false
        }
    }

    public async updateUser(userId: string, newUserObj: Partial<UserDto>) {
        try {

            let findUser = await this.userRepository.findUserById(userId)

            if (!findUser) {
                return UserResponseCode.notFound
            }

            let password = findUser.password

            if (newUserObj.userPassword && newUserObj.userPassword.trim() != "") {

                const comparePassword = await this.encryption.comparePassword(newUserObj.userPassword, password);

                if (!comparePassword) {

                    password = await this.encryption.encryptPassword(newUserObj.userPassword);

                }
            }

            let updateUserObj = {
                name: (newUserObj.userName && newUserObj.userName.trim() != "") ? newUserObj.userName : findUser.name,
                password: password,
                profile_image: (newUserObj.userProfileImage && newUserObj.userProfileImage.trim() != "") ? newUserObj.userProfileImage : findUser.profile_image,
                addresses: (Array.isArray(newUserObj.userAddresses) && newUserObj.userAddresses.length > 0) ? newUserObj.userAddresses : findUser.addresses,
            }

            let updateUser = await this.userRepository.updateUser(userId, updateUserObj)

            if (!updateUser) {
                return false
            }

            let responseData: UserDto = {
                userId: updateUser._id,
                userName: updateUser.name,
                userEmail: updateUser.email,
                userPhone: updateUser.phone,
                userType: updateUser.type,
                userProfileImage: updateUser.profile_image,
                userPassword: "",
                userStatus: updateUser.status,
                userAddresses: updateUser.addresses,
                createdAt: updateUser.createdAt,
                updatedAt: updateUser.updatedAt
            }
            return responseData

        } catch (error: any) {
            logger.error("*** UserService updateUser *** catch ERROR => " + error.stack)
            return false
        }
    }
}

export default UserService