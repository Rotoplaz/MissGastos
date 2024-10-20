import { CategoryRepository } from "@/src/domain/repositories/category.repository";

export class DeleteCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: number): Promise<void> {
    const categoryRemoved = await this.categoryRepository.deleteCategory(id);
    return categoryRemoved;
  }
}
