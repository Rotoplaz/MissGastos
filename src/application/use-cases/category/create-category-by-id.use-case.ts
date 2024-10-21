import { Category } from "@/src/domain/entities/category.entity";
import { CategoryRepository } from "@/src/domain/repositories/category.repository";

export class CreateCategoryUsecase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(category: Omit<Category, "id">): Promise<Category> {
    const newCategory = await this.categoryRepository.createCategory(category);

    return newCategory;
  }
}
