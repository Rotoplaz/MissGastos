import { Income } from "@/src/domain/entities/income.entity";
import { IncomeRepository } from "@/src/domain/repositories/income.repository";

export class UpdateIncomeUseCase{
    constructor(
        private readonly incomeRepository:IncomeRepository
    ){}

    async execute(id:number, income: Partial<Income>): Promise<Income>{
        const incomeUpdate = await this.incomeRepository.updateIncome(id,income);
        return incomeUpdate;
    }
}