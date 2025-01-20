import { IProduct, ProductDto } from "../model/Product";
import { IProductImage, ProductImageDto } from '../model/ProductImages';
import logger from "../utils/Logger";
import { ApiResponseCode } from "../config/Constant";
import ProductRepository from "../repository/ProductRepository";
const { CommonResponseCode, ProductResponseCode } = ApiResponseCode

class ProductService {

    protected productRepository: ProductRepository = new ProductRepository()


    public async createProduct(product: ProductDto): Promise<ProductDto | false> {
        try {

            const { userId, categoryId, productName, productDescription, productPrice, productThumbnail, productTotalQuantity, productTags } = product;

            const findExistingProduct = await this.productRepository.findProductByName(productName)

            if (findExistingProduct) {
                return ProductResponseCode.alreadyExist
            }

            let createObj: IProduct = {
                user_id: userId,
                category_id: categoryId,
                name: productName,
                description: productDescription,
                price: productPrice,
                thumbnail: productThumbnail,
                total_quantity: productTotalQuantity,
                tags: productTags,
            }

            let productCreate = await this.productRepository.createProduct(createObj)

            if (!productCreate) {
                return false
            }

            let responseData: ProductDto = {
                productId: productCreate._id,
                userId: productCreate.user_id,
                categoryId: productCreate.category_id,
                productName: productCreate.name,
                productDescription: productCreate.description,
                productPrice: productCreate.price,
                productThumbnail: productCreate.thumbnail,
                productTotalQuantity: productCreate.total_quantity,
                productTags: productCreate.tags,
                createdAt: productCreate.createdAt,
            }
            return responseData

        } catch (error: any) {
            logger.error("*** ProductService createProduct *** catch ERROR => " + error.stack)
            return false
        }
    }

    public async updateProduct(productId: string, product: Partial<ProductDto>): Promise<ProductDto | false> {
        try {

            let findProduct = await this.productRepository.findProductById(productId)

            if (!findProduct) {
                return ProductResponseCode.notFound
            }

            let productName = findProduct.name

            if (product.productName && product.productName.trim() != '') {

                const findExistingProduct = await this.productRepository.findProductByName(product.productName)

                if (findExistingProduct) {
                    return ProductResponseCode.alreadyExist
                }

                productName = product.productName
            }

            let updateProductObj = {
                name: productName,
                description: (product.productDescription && product.productDescription.trim() != "") ? product.productDescription : findProduct.description,
                price: (Number.isInteger(product.productPrice)) ? product.productPrice : findProduct.price,
                thumbnail: (product.productThumbnail && product.productThumbnail.trim() != "") ? product.productThumbnail : findProduct.thumbnail,
                total_quantity: (Number.isInteger(product.productTotalQuantity)) ? product.productTotalQuantity : findProduct.total_quantity,
                tags: (Array.isArray(product.productTags) && product.productTags.length > 0) ? product.productTags : findProduct.tags
            }

            let updateProduct = await this.productRepository.updateProduct(productId, updateProductObj)

            if (!updateProduct) {
                return false
            }

            let responseData: ProductDto = {
                productId: updateProduct._id,
                userId: updateProduct.user_id,
                categoryId: updateProduct.category_id,
                productName: updateProduct.name,
                productDescription: updateProduct.description,
                productPrice: updateProduct.price,
                productThumbnail: updateProduct.thumbnail,
                productTotalQuantity: updateProduct.total_quantity,
                productTags: updateProduct.tags,
                createdAt: updateProduct.createdAt,
                updatedAt: updateProduct.updatedAt,
            }
            return responseData

        } catch (error: any) {
            logger.error("*** ProductService updateProduct *** catch ERROR => " + error.stack)
            return false
        }
    }

    public async deleteProduct(productId: string): Promise<boolean> {
        try {

            let findProduct = await this.productRepository.findProductById(productId)

            if (!findProduct) {
                return ProductResponseCode.notFound
            }

            let deleteProduct = await this.productRepository.deleteProduct(productId)
            return deleteProduct

        } catch (error: any) {
            logger.error("*** ProductService deleteProduct *** catch ERROR => " + error.stack)
            return false
        }
    }

    public async getAllProduct(search: string = ""): Promise<ProductDto[] | false> {
        try {

            let getProduct = await this.productRepository.getAllProduct(search)

            if (!getProduct) {
                return false
            }

            let responseData = getProduct.map(Product => {
                return {
                    productId: Product._id,
                    userId: Product.user_id,
                    categoryId: Product.category_id,
                    productName: Product.name,
                    productDescription: Product.description,
                    productPrice: Product.price,
                    productThumbnail: Product.thumbnail,
                    productTotalQuantity: Product.total_quantity,
                    productTags: Product.tags,
                    createdAt: Product.createdAt,
                    updatedAt: Product.updatedAt,
                }
            })

            return responseData

        } catch (error: any) {
            logger.error("*** ProductService getAllProduct *** catch ERROR => " + error.stack)
            return false
        }
    }

    public async getSingleProduct(productId: string): Promise<ProductDto | false> {
        try {

            let findProduct = await this.productRepository.findProductById(productId)

            if (!findProduct) {
                return false
            }

            return {
                productId: findProduct._id,
                userId: findProduct.user_id,
                categoryId: findProduct.category_id,
                productName: findProduct.name,
                productDescription: findProduct.description,
                productPrice: findProduct.price,
                productThumbnail: findProduct.thumbnail,
                productTotalQuantity: findProduct.total_quantity,
                productTags: findProduct.tags,
                createdAt: findProduct.createdAt,
                updatedAt: findProduct.updatedAt,
            }

        } catch (error: any) {
            logger.error("*** ProductService getSingleProduct *** catch ERROR => " + error.stack)
            return false
        }
    }

    public async createProductImages(productId: string, productImage: string[]): Promise<ProductImageDto[] | false> {
        try {

            let findProduct = await this.productRepository.findProductById(productId)

            if (!findProduct) {
                return ProductResponseCode.notFound
            }

            let createObj: IProductImage[] = productImage.map((url) => {
                return {
                    product_id: productId,
                    url: url
                }
            }) 

            let productImageCreate = await this.productRepository.createProductImage(createObj)

            if (!productImageCreate) {
                return false
            }

            let responseData: ProductImageDto[] = productImageCreate.map(ProductImage => {
                return {
                    productImageId: ProductImage._id,
                    productId: ProductImage.product_id,
                    url: ProductImage.url,
                    createdAt: ProductImage.createdAt,
                    updatedAt: ProductImage.updatedAt,
                }
            }) 

            return responseData

        } catch (error: any) {
            logger.error("*** ProductService createProductImage *** catch ERROR => " + error.stack)
            return false
        }
    }

    public async deleteProductImage(productImageId: string[]): Promise<boolean> {
        try {

            let deleteProductImage = await this.productRepository.deleteProductImage(productImageId)
            return deleteProductImage

        } catch (error: any) {
            logger.error("*** ProductService deleteProductImage *** catch ERROR => " + error.stack)
            return false
        }
    }

    public async getProductImagesByProduct(productId: string): Promise<ProductImageDto[] | false> {
        try {

            let findProductImages = await this.productRepository.findImageByProductId(productId)

            if (!findProductImages) {
                return false
            }

            let responseData: ProductImageDto[] = findProductImages.map(ProductImage => {
                return {
                    productImageId: ProductImage._id,
                    productId: ProductImage.product_id,
                    url: ProductImage.url,
                    createdAt: ProductImage.createdAt,
                    updatedAt: ProductImage.updatedAt,
                }
            }) 

            return responseData
            
        } catch (error: any) {
            logger.error("*** ProductService getProductImagesByProduct *** catch ERROR => " + error.stack)
            return false
            
        }
    }


}

export default ProductService