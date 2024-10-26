import { Income } from "@/src/domain/entities/income.entity";
import { IncomeRepository } from "@/src/domain/repositories/income.repository";

export class GetIncomeByDateRangeUseCase {
  constructor(private readonly incomeRepository: IncomeRepository) {}

  async execute(startDate: Date, endDate: Date): Promise<Income[]> {
    const incomes = await this.incomeRepository.getIncomesByDateRange(
      startDate,
      endDate
    );
    return incomes;
  }
}
