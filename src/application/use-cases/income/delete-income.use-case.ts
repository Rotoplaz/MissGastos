import { IncomeRepository } from "@/src/domain/repositories/income.repository";

export class DeleteIncomeUseCase{
    constructor(
        private readonly incomeRepository:IncomeRepository
    ){}

    async execute(id:number): Promise<void>{
        await this.incomeRepository.deleteIncome(id);
    }
}