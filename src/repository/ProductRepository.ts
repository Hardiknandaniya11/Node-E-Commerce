import { Product, IProduct, ProductDto } from '../model/Product';
import { ProductImage, IProductImage, ProductImageDto } from '../model/ProductImages';
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

            let getProduct: IProduct | null | false = await Product.findOne({
                name: productName
            }).then((result: IProduct | null) => {
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

    async createProductImage(productImageData: IProductImage[]): Promise<IProductImage[] | false> {
        try {

            let createProductImage: IProductImage[] | false = await ProductImage.insertMany(productImageData).then((result: IProductImage[]) => {
                return result
            }).catch((error: any) => {
                logger.error(`*** ProductRepository createProductImage *** ERROR => ${error}`)
                return false
            })

            return createProductImage

        } catch (error: any) {
            logger.error(`*** ProductRepository createProductImage *** catch ERROR => ${error}`)
            return false
        }
    }

    async deleteProductImage(productImageId: string[]): Promise<boolean> {
        try {

            let deleteProductImage = await ProductImage.deleteMany({
                _id: { $in: productImageId }
            }).then((result: any) => {
                return true
            }).catch((error: any) => {
                logger.error(`*** ProductRepository deleteProductImage *** ERROR => ${error}`)
                return false
            });

            return deleteProductImage

        } catch (error: any) {
            logger.error(`*** ProductRepository deleteProductImage *** catch ERROR => ${error}`)
            return false
        }
    }

    async findProductImageById(productImageId: string): Promise<IProductImage | null | false> {
        try {

            let getProductImage: IProductImage | null | false = await ProductImage.findById(productImageId).then((result: IProductImage | null) => {
                return result
            }).catch((error: any) => {
                logger.error(`*** ProductRepository findProductImageById *** ERROR => ${error}`)
                return false
            })

            return getProductImage

        } catch (error: any) {
            logger.error(`*** ProductRepository findProductImageById *** catch ERROR => ${error}`)
            return false
        }
    }

    async findImageByProductId(productId: string): Promise<IProductImage[] | null | false> {
        try {

            let getProductImage: IProductImage[] | null | false = await ProductImage.find({
                product_id: productId
            }).then((result: IProductImage[] | null) => {
                return result
            }).catch((error: any) => {
                logger.error(`*** ProductRepository findImageByProductId *** ERROR => ${error}`)
                return false
            })

            return getProductImage

        } catch (error: any) {
            logger.error(`*** ProductRepository findImageByProductId *** catch ERROR => ${error}`)
            return false
        }
    }

}

export default ProductRepository;