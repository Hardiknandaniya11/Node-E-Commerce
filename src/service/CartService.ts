import { ICart, CartDto, cartProducts } from "../model/Cart";
import logger from "../utils/Logger";
import { ApiResponseCode } from "../config/Constant";
import CartRepository from "../repository/CartRepository";
const { CommonResponseCode, CartResponseCode} = ApiResponseCode

class CartService {

    protected cartRepository: CartRepository = new CartRepository()


    public async updateCart(userId: string, productData: Array<cartProducts>): Promise<CartDto | false> {
        try {

            let updateCart = await this.cartRepository.upsertCart(userId, productData)

            console.log("update cart in service", updateCart)
            if (!updateCart) {
                return false
            }

            let findCart = await this.cartRepository.getCart(userId)

            if (!findCart) {
                return false
            }
            
            let responseData: CartDto = {
                cartId: findCart._id,
                userId: findCart.user_id,
                products: findCart.products,
                createdAt: findCart.createdAt,
                updatedAt: findCart.updatedAt
            }
            return responseData

        } catch (error: any) {
            logger.error("*** CartService updateCart *** catch ERROR => " + error.stack)
            return false
        }
    }

    public async getCartDetail(userId: string): Promise<CartDto | false> {
        try {

            let findCart = await this.cartRepository.getCart(userId)

            if (!findCart) {
                return false
            }

            return {
                cartId: findCart._id,
                userId: findCart.user_id,
                products: findCart.products,
                createdAt: findCart.createdAt,
                updatedAt: findCart.updatedAt
            }

        } catch (error: any) {
            logger.error("*** CartService getCartDetail *** catch ERROR => " + error.stack)
            return false
        }
    }


}

export default CartService