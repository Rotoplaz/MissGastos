import { Expense } from "@/domain/entities/expense.entity";
import { ExpenseRepository } from "@/domain/repositories/expense.repository";


export class GetExpenseByIdUseCase {
    constructor(
        private readonly expenseRepository: ExpenseRepository
    ){}

    async execute(id: number): Promise<Expense | null>{
        const expense = await this.expenseRepository.getExpenseById(id);
        return expense;
    }
}