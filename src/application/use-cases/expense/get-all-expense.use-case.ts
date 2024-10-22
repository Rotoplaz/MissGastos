import { Expense } from "@/src/domain/entities/expense.entity";
import { ExpenseRepository } from "@/src/domain/repositories/expense.repository";

export class GetAllExpenseUseCase {

    constructor(
        private readonly expenseRepository: ExpenseRepository
    ){}

    async execute(): Promise<Expense[]> {
        const expense = await this.expenseRepository.getAllExpenses()
        return expense;
    }
}