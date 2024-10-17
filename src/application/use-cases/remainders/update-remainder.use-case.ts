import { Remainder } from "@/src/domain/entities/reminders.entity";
import { RemaindersRepository } from "@/src/domain/repositories/remainders.repository";


export class UpdateRemainderUseCase {
    constructor(
        private readonly remainderRepository: RemaindersRepository
    ){}

    async execute(id: number, remainder: Partial<Remainder>):Promise<Remainder> {
        const remainderUpdated = await this.remainderRepository.updateRemainder(id, remainder);
        return remainderUpdated;
    }
}