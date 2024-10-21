import { Schema, model } from 'mongoose';

interface IAddress {
  address: string;
  lat_long: Number[];
  address_type: string;
}

interface IUser {
  name: string;
  email: string;
  phone: string;
  password: string;
  type: Number;
  profile_image: string;
  status: Number;
  addresses: IAddress[];
}

const addressSchema = new Schema<IAddress>({
  address: { type: String, required: true },
  lat_long: { type: [Number], required: true },
  address_type: { type: String, required: true }
});

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: Number, required: true },
  profile_image: { type: String },
  status: { type: Number, default: 1 },
  addresses: [addressSchema]
}, { timestamps: true });

const User = model<IUser>('User', userSchema);
export {
    User,
    IUser
}
