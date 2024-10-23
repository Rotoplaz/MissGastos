import { ExpenseRepository } from "@/src/domain/repositories/expense.repository";
import { UserMetricsService } from "@/src/domain/services/user-metrics.service";

export class GetExpenseMetricsUseCase{
    constructor(
        private readonly userMetricsService:UserMetricsService,
        private readonly expenseRepository:ExpenseRepository
    ){}

    async execute(){
        const expenses = await this.expenseRepository.getExpensesGroupByCategory()
        const expenseMetrics = this.userMetricsService.getExpenseMetrics(expenses)
        return expenseMetrics;
    }
}