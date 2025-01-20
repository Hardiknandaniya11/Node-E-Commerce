import { Schema, model } from 'mongoose';

interface cartProducts {
    product_id: string;
    product_name: string;
    product_price: number;
    quantity: number;
}

interface ICart {
    _id?: string;
    user_id: string,
    products: Array<cartProducts>,
    createdAt?: Date,
    updatedAt?: Date
}

interface CartDto {
    cartId?: string;
    userId: string;
    products: Array<cartProducts>,
    createdAt?: Date,
    updatedAt?: Date
}

const cartProductSchema = new Schema<cartProducts>({
product_id: { type: String, required: true },
product_name: { type: String, required: true },
product_price: { type: Number, required: true },
quantity: { type: Number, required: true },
})

const cartSchema = new Schema<ICart>({
    user_id: { type: String, required: true },
    products: { type: [cartProductSchema], required: true }
}, { timestamps: true });


const Cart = model<ICart>('Cart', cartSchema);
export {
    Cart,
    ICart,
    CartDto,
    cartProducts
}
