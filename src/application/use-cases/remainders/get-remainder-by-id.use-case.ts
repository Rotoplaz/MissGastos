import { Remainder } from "@/src/domain/entities/reminders.entity";
import { RemaindersRepository } from "@/src/domain/repositories/remainders.repository";


export class GetRemainderByIdUseCase {
    constructor(
        private readonly remainderRepository: RemaindersRepository
    ){}

    async execute(id:number): Promise<Remainder | null>{
        const remainder = await this.remainderRepository.getRemainderById(id);

        return remainder;
    }

}