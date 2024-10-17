import { Expense } from "@/src/domain/entities/expense.entity";
import { ExpenseRepository } from "@/src/domain/repositories/expense.repository";


export class CreateExpenseUseCase {
    
    constructor(
        private readonly expenseRepository: ExpenseRepository
    ){}

    async execute(expense: Omit<Expense, "id">): Promise<Expense> {
        const newExpense = await this.expenseRepository.createExpense(expense);
        return newExpense;
    }
}