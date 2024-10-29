import { ExpenseRepository } from "@/src/domain/repositories/expense.repository";
import { ExpenseChartDto } from "../../dtos/expense-chart.dto";



export class GetExpensesGroupByCategoryUseCase {
    constructor(
        private readonly expenseRepository: ExpenseRepository
    ){}

    async execute(): Promise<ExpenseChartDto[]> {
        const expense = await this.expenseRepository.getExpensesGroupByCategory();
        return expense;
    }
}