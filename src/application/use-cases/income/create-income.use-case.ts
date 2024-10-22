import { Income } from "@/src/domain/entities/income.entity";
import { IncomeRepository } from "@/src/domain/repositories/income.repository";

export class CreateIncomeUseCase {
    constructor(
        private readonly incomeRepository:IncomeRepository
    ){}

    async execute(income: Omit<Income, "id">): Promise<Income>{
        const newincome = await this.incomeRepository.createIncome(income);
        return newincome;
    }
}