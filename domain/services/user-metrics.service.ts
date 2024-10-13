import { ExpenseSqliteRepositoryImpl } from "@/infrastructure/expense/expense-sqlite.repository.impl";
import { ExpenseRepository } from "../repositories/expense.repository";

export class UserMetricsService {
    constructor(
        private readonly expenseRepository:ExpenseRepository
    ){}
    async getExpenseMetrics(){
        const allExpenseGroupByCategory = await this.expenseRepository.getExpensesGroupByCategory()
        allExpenseGroupByCategory

        return {
            allExpenseGroupByCategory
        }
    }

}
