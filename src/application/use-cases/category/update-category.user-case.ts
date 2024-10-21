import { Category } from "@/src/domain/entities/category.entity";
import { CategoryRepository } from "@/src/domain/repositories/category.repository";

export class UpdateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: number, category: Partial<Category>): Promise<Category> {
    const categoryUpdate = await this.categoryRepository.updateCategory(
      id,
      category
    );
    return categoryUpdate;
  }
}
