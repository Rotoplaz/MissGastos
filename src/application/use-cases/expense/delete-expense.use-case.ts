import { ExpenseRepository } from "@/src/domain/repositories/expense.repository";




export class DeleteExpenseUseCase {

    constructor(
        private readonly expenseRepository: ExpenseRepository
    ){}

    async execute(id: number): Promise<void> {
        await this.expenseRepository.deleteExpense(id);
    }
}