import { Category } from "@/domain/entities/category.entity";
import { CategoryRepository } from "@/domain/repositories/category.repository";


export class CategoryMemoryImpl implements CategoryRepository {

    private categories: Category[] = [];

    async getCategoryById(id: number): Promise<Category | null> {
        const category = this.categories.find(category => category.id === id);

        if (!category){
            return null
        }

        return category;
    }

    async createCategory(category: Omit<Category, "id">): Promise<Category> {
        const lastCategory = this.categories[this.categories.length - 1];
        const newId = lastCategory ? lastCategory.id + 1 : 1;
    
        const newCategory: Category = {
            ...category,
            id: newId,
        };
    
        this.categories.push(newCategory);
    
        return newCategory;
    }

    async updateCategory(id: number, category: Partial<Category>): Promise<Category> {

        const categoryToUpdate = await this.getCategoryById(id);
        if (!categoryToUpdate) {
            throw new Error(`Category with id: ${id} not found`);
        }
    
        const categoryUpdated = {
            ...categoryToUpdate,
            ...category
        };
    
        const index = this.categories.findIndex(cat => cat.id === id);
        this.categories[index] = categoryUpdated;
    
        return categoryUpdated;
    }

    async deleteCategory(id: number): Promise<void> {
        
        const newCategories = this.categories.filter(category=>category.id !== id);
        this.categories = newCategories;

    }

    async getAllCategories(): Promise<Category[]> {
        return this.categories;
    }

}