import { Expense } from "@/src/domain/entities/expense.entity";
import { ExpenseRepository } from "@/src/domain/repositories/expense.repository";

export class GetExpenseByDateRangeUseCase {
  constructor(private readonly expenseRepository: ExpenseRepository) {}

  async execute(startDate: Date, endDate: Date): Promise<Expense[]> {
    const expense = await this.expenseRepository.getExpensesByDateRange(
      startDate,
      endDate
    );
    return expense;
  }
}
