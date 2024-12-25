import { Schema, model } from 'mongoose';

interface IProduct {
  _id?: string;
  user_id: string,
  category_id: string,
  name: string,
  description: string,
  price: number,
  thumbnail: string,
  total_quantity: number,
  tags: Array<string>,
  createdAt?: Date,
  updatedAt?: Date
}

interface ProductDto {
  productId?: string;
  userId: string;
  categoryId: string,
  productName: string,
  productDescription: string,
  productPrice: number,
  productThumbnail: string,
  productTotalQuantity: number,
  productTags: Array<string>
  createdAt?: Date,
  updatedAt?: Date
}

const productSchema = new Schema<IProduct>({
  user_id: { type: String, required: true },
  category_id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  total_quantity: { type: Number, required: true },
  tags: { type: [String], required: true}
}, { timestamps: true });

productSchema.index(
  { name: 'text', tags: 'text' },
  { weights: { name: 5, tags: 2 } }
);

const Product = model<IProduct>('Product', productSchema);
export {
    Product,
    IProduct,
    ProductDto
}
