import { Income } from "@/src/domain/entities/income.entity";
import { IncomeRepository } from "@/src/domain/repositories/income.repository";

export class GetIncomeByIdUseCase {
    constructor(
        private readonly incomeRepository:IncomeRepository
    ){}

    async execute(id:number):Promise<Income | null>{
        const income = await this.incomeRepository.getIncomeById(id)
        return income;
    }

}