import { Cart, CartDto, ICart, cartProducts } from '../model/Cart';
import logger from '../utils/Logger';

class CartRepository {
    
    async upsertCart(userId: string, productData: Array<cartProducts>): Promise<boolean> {
        try {

            let update: boolean = await Cart.updateOne({
                user_id: userId
            }, {
                products: productData
            }, { new: true, upsert: true }).then((result: any) => {
                if (result.modifiedCount > 0 || result.upsertedCount > 0) {
                    return true
                }else {
                    return false
                }
            }).catch((error: any) => {
                logger.error(`*** CartRepository upsertCart *** ERROR => ${error}`)
                return false
            });

            return update

        } catch (error: any) {
            logger.error(`*** CartRepository upsertCart *** catch ERROR => ${error.stack}`)
            return false
        }
    }


    async getCart(userId: string): Promise<ICart | false | null> {
        try {

            let getCart: ICart | false | null = await Cart.findOne({user_id: userId}).then((result: ICart | null) => {
                return result
            }).catch((error: any) => {
                logger.error(`*** CartRepository getCart *** ERROR => ${error}`)
                return false
            })

            return getCart

        } catch (error: any) {
            logger.error(`*** CartRepository getCart *** catch ERROR => ${error.stack}`)
            return false
        }
    }

}

export default CartRepository;