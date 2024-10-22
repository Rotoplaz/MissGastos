import { Expense } from "@/src/domain/entities/expense.entity";
import { ExpenseRepository } from "@/src/domain/repositories/expense.repository";


export class UpdateExpenseUseCase {
    constructor(
        private readonly expenseRepository: ExpenseRepository
    ){}

    async execute(id: number, expense: Partial<Expense>): Promise<Expense> {
        const expenseUpdated = await this.expenseRepository.updateExpense(id, expense);
        return expenseUpdated;
    }
}