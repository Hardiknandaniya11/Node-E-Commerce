import { Category, CategoryDto, ICategory } from '../model/Category';
import logger from '../utils/Logger';

class CategoryRepository {


    async createCategory(categoryData: ICategory): Promise< ICategory | false> {

        const category = new Category(categoryData);
       let createCategory: ICategory | false = await category.save().then((result: ICategory) => {
            return  result 
        }).catch((error: any) => {
            logger.error(`*** CategoryRepository createCategory *** ERROR => ${error}`)
            return false 
        })

        return createCategory
    }

    async getAllCategory(search: string): Promise<ICategory[] | [] | false> {

        let query: any = {}

        if (search.trim() != "") {
            query = {$text: { $search : search}}
        }

       let getCategory: ICategory[] | [] | false = await Category.find(query).then((result: ICategory[] | []) => {
            return  result 
        }).catch((error: any) => {
            logger.error(`*** CategoryRepository getAllCategory *** ERROR => ${error}`)
            return false 
        })

        return getCategory
    }

    async updateCategory(categoryId: string, updateData: Partial<ICategory>): Promise<ICategory | null | false> {

        let update: ICategory | null | false = await Category.findByIdAndUpdate(categoryId, updateData, { new: true }).then((result: ICategory | null) => {
            return result
        }).catch((error: any) => {
            logger.error(`*** CategoryRepository updateCategory *** ERROR => ${error}`)
            return false 
        });

        return update
    }

    async deleteCategory(categoryId: string): Promise<boolean> {

        let deleteCategory = await Category.findByIdAndDelete(categoryId).then((result: any) => {
            return true
        }).catch((error: any) => {
            logger.error(`*** CategoryRepository deleteCategory *** ERROR => ${error}`)
            return false
        });

        return deleteCategory
    }

    async findCategoryById(categoryId: string): Promise<ICategory | null | false> {

       let getCategory: ICategory | null | false = await Category.findById(categoryId).then((result: ICategory | null) => {
            return result
        }).catch((error: any) => {
            logger.error(`*** CategoryRepository findCategoryById *** ERROR => ${error}`)
            return false
        })

        return getCategory
    }

    async findCategoryByName(categoryName: string): Promise<ICategory | null | false> {

        let getCategory: ICategory | null | false = await Category.findById(categoryName).then((result: ICategory | null) => {
             return result
         }).catch((error: any) => {
             logger.error(`*** CategoryRepository findCategoryByName *** ERROR => ${error}`)
             return false
         })
 
         return getCategory
     }

}

export default CategoryRepository;