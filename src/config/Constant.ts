
// Mongo Constants
const mongoUserName: string = "hardik";
const mongoDatabaseName: string = "node-e-commerce";
const mongoDBPassword: string = "h6rIeGoloX7kH3Z0";
export const MONGO_URI: string = `mongodb+srv://${mongoUserName}:${mongoDBPassword}@cluster0.hdjoh2f.mongodb.net/${mongoDatabaseName}?retryWrites=true&w=majority&appName=Cluster0`;

export const TOKEN_SECRET: string =
  "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611123";

export const USER_TYPE = {
    admin: 1,
    vendor: 2,
    customer: 3,
};

export const USER_STATUS = {
    verifies: 1,
    notVerified: 2
};

export const ApiResponseCode: any = {
  CommonResponseCode: {
    success: 200,
    notAuthorized: {
      status: false,
      statusCode: 401,
      message:
        "Necessary authentication parameters are not provided or invalid credentials",
    },
    forbidden: {
      status: false,
      statusCode: 403,
      message: "Authentication failed",
    },
    notFound: {
      status: false,
      statusCode: 404,
      message: "Record not found",
    },
    serverError: {
      status: false,
      statusCode: 500,
      message: "Server Error",
    },
  },
  UserResponseCode: {
    notFound: {
      status: false,
      statusCode: 1001,
      message: "User not found please register",
    },
    alreadyExist: {
      status: false,
      statusCode: 1002,
      message: "User already Exist",
    },
    failedToDelete: {
      status: false, 
      statusCode: 1003,
      message: "failed to delete user"
    },
    failedToUpdate: {
      status: false,
      statusCode: 1004,
      message: "failed to update user"
    }
  },
  CategoryResponseCode: {
    notFound: {
      status: false,
      statusCode: 1101,
      message: "Category not found",
    },
    alreadyExist: {
      status: false,
      statusCode: 1102,
      message: "Category already Exist",
    },
    failedToDelete: {
      status: false, 
      statusCode: 1103,
      message: "failed to delete Category"
    },
    failedToUpdate: {
      status: false,
      statusCode: 1104,
      message: "failed to update Category"
    }
  },
  ProductResponseCode: {
    notFound: {
      status: false,
      statusCode: 1201,
      message: "Product not found",
    },
    alreadyExist: {
      status: false,
      statusCode: 1202,
      message: "Product already Exist",
    },
    failedToDelete: {
      status: false, 
      statusCode: 1203,
      message: "failed to delete Product"
    },
    failedToUpdate: {
      status: false,
      statusCode: 1204,
      message: "failed to update Product"
    }
  },
  CartResponseCode: {
    notFound: {
      status: false,
      statusCode: 1301,
      message: "No Product in Cart",
    },
    failedToUpdate: {
      status: false,
      statusCode: 1302,
      message: "failed to update Cart"
    }
  }
};
