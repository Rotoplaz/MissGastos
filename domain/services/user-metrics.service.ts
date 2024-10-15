import { ExpenseSqliteRepositoryImpl } from "@/infrastructure/expense/expense-sqlite.repository.impl";
import { ExpenseRepository } from "../repositories/expense.repository";
import { UserRepository } from "../repositories/user.repository";

export class UserMetricsService {
    constructor(
        private readonly expenseRepository:ExpenseRepository,
        private readonly userRepository:UserRepository
    ){}
    async getExpenseMetrics(){
        const allExpenseGroupByCategory = await this.expenseRepository.getExpensesGroupByCategory();
        const totalSum = allExpenseGroupByCategory.reduce((acc, item) => acc + item.totalExpense, 0);
        const totalExpensePercentages = allExpenseGroupByCategory.map(item =>{
            return{
                type:item.type,
                porcentage: (item.totalExpense / totalSum) * 100
            };
        });

        return {
            allExpenseGroupByCategory, totalSum, totalExpensePercentages
        }
    }

    async getExpenseMetricsControl(){
        const user = await this.userRepository.getUser();
        const allExpense = await this.expenseRepository.getAllExpenses();
        const totalSumExpense = allExpense.reduce((acc, item) => acc + item.amount, 0);


    }



}
