import { Category } from "@/src/domain/entities/category.entity";
import { CategoryRepository } from "@/src/domain/repositories/category.repository";

export class GetCategoryByIdUseCase {
    constructor(
        private readonly categoryRepository:CategoryRepository
    ){}

    async execute(id:number): Promise<Category | null>{
        const category = await this.categoryRepository.getCategoryById(id);
        return category;
    }
}
