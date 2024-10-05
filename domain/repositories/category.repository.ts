import { Category } from "../entities/category.entity";


export interface CategoryRepository {
    getCategoryById(id: number): Promise<Category | null>;
    createCategory(category: Omit<Category, "id">): Promise<Category>;
    updateCategory(id: number, category: Partial<Category>): Promise<Category>;
    deleteCategory(id: number): Promise<void>;
    getAllCategories(): Promise<Category[]>;
}

