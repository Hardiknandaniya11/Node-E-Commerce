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
  categoryTags: Array<string>;
  createdAt?: Date,
  updatedAt?: Date
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], required: true}
}, { timestamps: true });

categorySchema.index(
  { name: 'text', tags: 'text' },
  { weights: { name: 5, tags: 2 } }
);

const Category = model<ICategory>('Category', categorySchema);
export {
    Category,
    ICategory,
    CategoryDto
}
