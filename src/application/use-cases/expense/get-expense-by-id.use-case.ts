import { Expense } from "@/src/domain/entities/expense.entity";
import { ExpenseRepository } from "@/src/domain/repositories/expense.repository";

export class GetExpenseByIdUseCase {
    constructor(
        private readonly expenseRepository: ExpenseRepository
    ){}

    async execute(id: number): Promise<Expense | null>{
        const expense = await this.expenseRepository.getExpenseById(id);
        return expense;
    }
}