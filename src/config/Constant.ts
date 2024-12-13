
// Mongo Constants
    const mongoUserName: string = 'hardik'
    const mongoDatabaseName: string = 'node-e-commerce'
    const mongoDBPassword: string = 'h6rIeGoloX7kH3Z0'
export const mongoUri: string = `mongodb+srv://${mongoUserName}:${mongoDBPassword}@cluster0.hdjoh2f.mongodb.net/${mongoDatabaseName}?retryWrites=true&w=majority&appName=Cluster0`

export const tokenSecret: string = "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611123"

export const ApiResponseCode: any = {
    CommonResponseCode: {
        success: 200,
        notFound: {
            status: false,
            statusCode: 404,
            message: "Record not found"
        },
        serverError: {
            status: false,
            statusCode: 500,
            message: "Server Error"
        }
    },
    UserResponseCode: {
        notFound: {
            status: false,
            statusCode: 1001,
            message: "User not found please register"
        },
        alreadyExist: {
            status: false,
            statusCode: 1002,
            message: "User already Exist"
        }
    }
}