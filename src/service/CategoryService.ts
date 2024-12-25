import { ICategory, CategoryDto } from "../model/Category";
import logger from "../utils/Logger";
import { ApiResponseCode } from "../config/Constant";
import CategoryRepository from "../repository/CategoryRepository";
const { CommonResponseCode, CategoryResponseCode } = ApiResponseCode

class CategoryService {

    protected categoryRepository: CategoryRepository = new CategoryRepository()


    public async createCategory(category: CategoryDto): Promise<CategoryDto | false> {
        try {

            const { categoryName, categoryDescription, categoryTags } = category;

            const findExistingCategory = await this.categoryRepository.findCategoryByName(categoryName)

            if (findExistingCategory) {
                return CategoryResponseCode.alreadyExist
            }

            let createObj: ICategory = {
                name: categoryName,
                description: categoryDescription,
                tags: categoryTags
            }

            let categoryCreate = await this.categoryRepository.createCategory(createObj)

            if (!categoryCreate) {
                return false
            }

            let responseData: CategoryDto = {
                categoryId: categoryCreate._id,
                categoryName: categoryCreate.name,
                categoryDescription: categoryCreate.description,
                categoryTags: categoryCreate.tags,
                createdAt: categoryCreate.createdAt,
            }
            return responseData

        } catch (error: any) {
            logger.error("*** CategoryService createCategory *** catch ERROR => " + error.stack)
            return false
        }
    }

    public async updateCategory(categoryId: string, category: Partial<CategoryDto>): Promise<CategoryDto | false> {
        try {

            let findCategory = await this.categoryRepository.findCategoryById(categoryId)

            if (!findCategory) {
                return CategoryResponseCode.notFound
            }

            let categoryName = findCategory.name

            if (category.categoryName && category.categoryName.trim() != '') {

                const findExistingCategory = await this.categoryRepository.findCategoryByName(category.categoryName)

                if (findExistingCategory) {
                    return CategoryResponseCode.alreadyExist
                }

                categoryName = category.categoryName
            }

            let updateCategoryObj = {
                name: categoryName,
                description: (category.categoryDescription && category.categoryDescription.trim() != "") ? category.categoryDescription : findCategory.description,
                tags: (Array.isArray(category.categoryTags) && category.categoryTags.length > 0) ? category.categoryTags : findCategory.tags
            }

            let updateCategory = await this.categoryRepository.updateCategory(categoryId, updateCategoryObj)

            if (!updateCategory) {
                return false
            }

            let responseData: CategoryDto = {
                categoryId: updateCategory._id,
                categoryName: updateCategory.name,
                categoryDescription: updateCategory.description,
                categoryTags: updateCategory.tags,
                createdAt: updateCategory.createdAt,
                updatedAt: updateCategory.updatedAt
            }
            return responseData

        } catch (error: any) {
            logger.error("*** CategoryService updateCategory *** catch ERROR => " + error.stack)
            return false
        }
    }

    public async deleteCategory(categoryId: string): Promise<boolean> {
        try {

            let findCategory = await this.categoryRepository.findCategoryById(categoryId)

            if (!findCategory) {
                return CategoryResponseCode.notFound
            }

            let deleteCategory = await this.categoryRepository.deleteCategory(categoryId)
            return deleteCategory

        } catch (error: any) {
            logger.error("*** CategoryService deleteCategory *** catch ERROR => " + error.stack)
            return false
        }
    }

    public async getAllCategory(search: string = ""): Promise<CategoryDto[] | false> {
        try {

            let getCategories = await this.categoryRepository.getAllCategory(search)

            if (!getCategories) {
                return false
            }

            let responseData = getCategories.map(category => {
                return {
                    categoryId: category._id,
                    categoryName: category.name,
                    categoryDescription: category.description,
                    categoryTags: category.tags,
                    createdAt: category.createdAt,
                    updatedAt: category.updatedAt
                }
            })

            return responseData

        } catch (error: any) {
            logger.error("*** CategoryService getAllCategory *** catch ERROR => " + error.stack)
            return false
        }
    }

    public async getSingleCategory(categoryId: string): Promise<CategoryDto | false> {
        try {

            let findCategory = await this.categoryRepository.findCategoryById(categoryId)

            if (!findCategory) {
                return false
            }

            return {
                categoryId: findCategory._id,
                categoryName: findCategory.name,
                categoryDescription: findCategory.description,
                categoryTags: findCategory.tags,
                createdAt: findCategory.createdAt,
                updatedAt: findCategory.updatedAt
            }

        } catch (error: any) {
            logger.error("*** CategoryService getSingleCategory *** catch ERROR => " + error.stack)
            return false
        }
    }


}

export default CategoryService