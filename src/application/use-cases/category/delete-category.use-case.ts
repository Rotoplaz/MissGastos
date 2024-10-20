import { CategoryRepository } from "@/src/domain/repositories/category.repository";

export class DeleteCategoryUseCase {
    constructor(
        private readonly categoryRepository:CategoryRepository
    ){}

    async execute(id:number): Promise<void>{
        await this.categoryRepository.deleteCategory(id);
    }
}