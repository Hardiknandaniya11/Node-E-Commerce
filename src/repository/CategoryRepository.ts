import { Category, CategoryDto, ICategory } from '../model/Category';
import logger from '../utils/Logger';

class CategoryRepository {


    async createCategory(categoryData: ICategory): Promise<ICategory | false> {
        try {

            const category = new Category(categoryData);
            let createCategory: ICategory | false = await category.save().then((result: ICategory) => {
                return result
            }).catch((error: any) => {
                logger.error(`*** CategoryRepository createCategory *** ERROR => ${error}`)
                return false
            })

            return createCategory

        } catch (error: any) {
            logger.error(`*** CategoryRepository createCategory *** catch ERROR => ${error.stack}`)
            return false
        }
    }

    async getAllCategory(search: string): Promise<ICategory[] | [] | false> {
        try {

            let query: any = {}

            if (search.trim() != "") {
                query = { $text: { $search: search } }
            }

            let getCategory: ICategory[] | [] | false = await Category.find(query).then((result: ICategory[] | []) => {
                return result
            }).catch((error: any) => {
                logger.error(`*** CategoryRepository getAllCategory *** ERROR => ${error}`)
                return false
            })

            return getCategory

        } catch (error: any) {
            logger.error(`*** CategoryRepository getAllCategory *** catch ERROR => ${error.stack}`)
            return false
        }
    }

    async updateCategory(categoryId: string, updateData: Partial<ICategory>): Promise<ICategory | null | false> {
        try {

            let update: ICategory | null | false = await Category.findByIdAndUpdate(categoryId, updateData, { new: true }).then((result: ICategory | null) => {
                return result
            }).catch((error: any) => {
                logger.error(`*** CategoryRepository updateCategory *** ERROR => ${error}`)
                return false
            });

            return update

        } catch (error: any) {
            logger.error(`*** CategoryRepository updateCategory *** catch ERROR => ${error.stack}`)
            return false
        }
    }

    async deleteCategory(categoryId: string): Promise<boolean> {
        try {

            let deleteCategory = await Category.findByIdAndDelete(categoryId).then((result: any) => {
                return true
            }).catch((error: any) => {
                logger.error(`*** CategoryRepository deleteCategory *** ERROR => ${error}`)
                return false
            });

            return deleteCategory

        } catch (error: any) {
            logger.error(`*** CategoryRepository deleteCategory *** catch ERROR => ${error.stack}`)
            return false
        }
    }

    async findCategoryById(categoryId: string): Promise<ICategory | null | false> {
        try {

            let getCategory: ICategory | null | false = await Category.findById(categoryId).then((result: ICategory | null) => {
                return result
            }).catch((error: any) => {
                logger.error(`*** CategoryRepository findCategoryById *** ERROR => ${error}`)
                return false
            })

            return getCategory

        } catch (error: any) {
            logger.error(`*** CategoryRepository findCategoryById *** catch ERROR => ${error.stack}`)
            return false
        }
    }

    async findCategoryByName(categoryName: string): Promise<ICategory | null | false> {
        try {

            let getCategory: ICategory | null | false = await Category.findById(categoryName).then((result: ICategory | null) => {
                return result
            }).catch((error: any) => {
                logger.error(`*** CategoryRepository findCategoryByName *** ERROR => ${error}`)
                return false
            })

            return getCategory

        } catch (error: any) {
            logger.error(`*** CategoryRepository findCategoryByName *** catch ERROR => ${error.stack}`)
            return false
        }
    }

}

export default CategoryRepository;