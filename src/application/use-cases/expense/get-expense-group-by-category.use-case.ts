import { ExpenseRepository } from "@/src/domain/repositories/expense.repository";



export class GetExpensesGroupByCategoryUseCase {
    constructor(
        private readonly expenseRepository: ExpenseRepository
    ){}

    async execute(): Promise<{
        type: string;
        totalExpense: number;
        color: string;
    }[]> {
        const expense = await this.expenseRepository.getExpensesGroupByCategory();
        return expense;
    }
}