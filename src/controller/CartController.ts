import { Request, Response } from "express";
import logger from "../utils/Logger";
import { ApiResponseCode } from "../config/Constant";
import CartService from "../service/CartService";
const { CommonResponseCode, CartResponseCode } = ApiResponseCode



class Cart {

    private cartService: CartService = new CartService()

    update = async (req: Request, res: Response) => {
        try {

            let updateCart = await this.cartService.updateCart(req.body.userId, req.body.products)
            console.log("update cart in controller", updateCart)
            if (!updateCart) {
                res.status(200).json(CartResponseCode.failedToUpdate)
            }
            res.status(200).json(updateCart)

        } catch (error: any) {
            logger.error("*** CartController update *** catch ERROR => " + error.stack)
            res.status(500).json(CommonResponseCode.serverError)
        }
    }

    getSingle = async (req: Request, res: Response) => {
        try {

            let getCart = await this.cartService.getCartDetail(req.body.userId)

            if (!getCart) {
                res.status(200).json(CartResponseCode.notFound)
            }
            res.status(200).json({ status: true, statusCode: CommonResponseCode.success, data: getCart })

        } catch (error: any) {
            logger.error("*** CartController getSingle *** catch ERROR => " + error.stack)
            res.status(500).json(CommonResponseCode.serverError)
        }
    }

}

export default Cart;
