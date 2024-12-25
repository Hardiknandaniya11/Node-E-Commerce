import { Product, IProduct, ProductDto } from '../model/Product';
import logger from '../utils/Logger';

class ProductRepository {


    async createProduct(productData: IProduct): Promise<IProduct | false> {
        try {

            const product = new Product(productData);
            let createProduct: IProduct | false = await product.save().then((result: IProduct) => {
                return result
            }).catch((error: any) => {
                logger.error(`*** ProductRepository createProduct *** ERROR => ${error}`)
                return false
            })

            return createProduct

        } catch (error: any) {
            logger.error(`*** ProductRepository createProduct *** catch ERROR => ${error}`)
            return false
        }
    }

    async getAllProduct(search: string): Promise<IProduct[] | [] | false> {
        try {

            let query: any = {}

            if (search.trim() != "") {
                query = { $text: { $search: search } }
            }

            let getProduct: IProduct[] | [] | false = await Product.find(query).then((result: IProduct[] | []) => {
                return result
            }).catch((error: any) => {
                logger.error(`*** productRepository getAllProduct *** ERROR => ${error}`)
                return false
            })

            return getProduct

        } catch (error: any) {
            logger.error(`*** ProductRepository getAllProduct *** catch ERROR => ${error}`)
            return false
        }
    }

    async updateProduct(productId: string, updateData: Partial<IProduct>): Promise<IProduct | null | false> {
        try {

            let update: IProduct | null | false = await Product.findByIdAndUpdate(productId, updateData, { new: true }).then((result: IProduct | null) => {
                return result
            }).catch((error: any) => {
                logger.error(`*** ProductRepository updateProduct *** ERROR => ${error}`)
                return false
            });

            return update

        } catch (error: any) {
            logger.error(`*** ProductRepository updateProduct *** catch ERROR => ${error}`)
            return false

        }
    }

    async deleteProduct(productId: string): Promise<boolean> {
        try {

            let deleteProduct = await Product.findByIdAndDelete(productId).then((result: any) => {
                return true
            }).catch((error: any) => {
                logger.error(`*** ProductRepository deleteProduct *** ERROR => ${error}`)
                return false
            });

            return deleteProduct

        } catch (error: any) {
            logger.error(`*** ProductRepository deleteProduct *** catch ERROR => ${error}`)
            return false
        }
    }

    async findProductById(productId: string): Promise<IProduct | null | false> {
        try {

            let getProduct: IProduct | null | false = await Product.findById(productId).then((result: IProduct | null) => {
                return result
            }).catch((error: any) => {
                logger.error(`*** ProductRepository findProductById *** ERROR => ${error}`)
                return false
            })

            return getProduct

        } catch (error: any) {
            logger.error(`*** ProductRepository findProductById *** catch ERROR => ${error}`)
            return false
        }
    }

    async findProductByName(productName: string): Promise<IProduct | null | false> {
        try {

            let getProduct: IProduct | null | false = await Product.findById(productName).then((result: IProduct | null) => {
                return result
            }).catch((error: any) => {
                logger.error(`*** ProductRepository findProductName *** ERROR => ${error}`)
                return false
            })

            return getProduct

        } catch (error: any) {
            logger.error(`*** ProductRepository findProductName *** catch ERROR => ${error}`)
            return false

        }
    }

}

export default ProductRepository;