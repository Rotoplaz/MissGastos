import { ExpenseRepository } from "@/src/domain/repositories/expense.repository";
import { UserRepository } from "@/src/domain/repositories/user.repository";
import { UserMetricsService } from "@/src/domain/services/user-metrics.service";

export class GlobalMetricsUseCase{
    constructor(
        private readonly userMetricsService:UserMetricsService,
        private readonly expenseRepository:ExpenseRepository,
        private readonly userRepository:UserRepository
    ){}

    async execute(){
        const user = await this.userRepository.getUser();
        if (!user){
            throw Error('User not found');
        }
        const expenses = await this.expenseRepository.getExpensesGroupByCategory();
        const globalMetrics = this.userMetricsService.globalMetrics(user,expenses);

        return globalMetrics;
    }
}