import { Schema, model } from 'mongoose';

interface IProductImage {
  _id?: string;
  url: string,
  product_id: string,
  createdAt?: Date,
  updatedAt?: Date
}

interface ProductImageDto {
  productImageId?: string;
  productId?: string;
  url: string,
  createdAt?: Date,
  updatedAt?: Date
}

const productImageSchema = new Schema<IProductImage>({
  product_id: { type: String, required: true },
  url: { type: String, required: true },
}, { timestamps: true });

const ProductImage = model<IProductImage>('product_image', productImageSchema);
export {
    ProductImage,
    IProductImage,
    ProductImageDto
}
