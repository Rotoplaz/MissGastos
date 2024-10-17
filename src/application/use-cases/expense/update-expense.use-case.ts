import { Expense } from "@/domain/entities/expense.entity";
import { ExpenseRepository } from "@/domain/repositories/expense.repository";


export class UpdateExpenseUseCase {
    constructor(
        private readonly expenseRepository: ExpenseRepository
    ){}

    async execute(id: number, expense: Partial<Expense>): Promise<Expense> {
        const expenseUpdated = await this.expenseRepository.updateExpense(id, expense);
        return expenseUpdated;
    }
}