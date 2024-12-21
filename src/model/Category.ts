import { Schema, model } from 'mongoose';

interface ICategory {
  _id?: string;
  name: string,
  description: string,
  tags: Array<string>,
  createdAt?: Date,
  updatedAt?: Date
}

interface CategoryDto {
  categoryId?: string;
  categoryName: string;
  categoryDescription: string;
  categoryTags: string;
  createdAt?: Date,
  updatedAt?: Date
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], required: true}
}, { timestamps: true });

const Category = model<ICategory>('Category', categorySchema);
export {
    Category,
    ICategory,
    CategoryDto
}
