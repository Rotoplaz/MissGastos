import { Income } from "@/src/domain/entities/income.entity";
import { IncomeRepository } from "@/src/domain/repositories/income.repository";

export class GetAllIncomeUseCase {
  constructor(private readonly incomeRepository: IncomeRepository) {}

  async execute(): Promise<Income[]> {
    const allIncomes = await this.incomeRepository.getAllIncome();
    return allIncomes;
  }
}
