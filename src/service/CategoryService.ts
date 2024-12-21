import { ICategory, CategoryDto } from "../model/Category";
import logger from "../utils/Logger";
import { ApiResponseCode } from "../config/Constant";
const { CommonResponseCode, CategoryResponseCode } = ApiResponseCode

class CategoryService {


    public async createCategory(category: CategoryDto): Promise<any> {

        
    }

    public async updateCategory(categoryId: string, category: Partial<CategoryDto>): Promise<any> {

        
    }

    public async deleteCategory(categoryId: string): Promise<any> {

        
    }

    public async getAllCategory(): Promise<any> {

        
    }

    public async getSingleCategory(categoryId: string): Promise<any> {

        
    }

   
}

export default CategoryService