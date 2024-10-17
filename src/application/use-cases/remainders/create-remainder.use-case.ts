import { Remainder } from "@/src/domain/entities/reminders.entity";
import { RemaindersRepository } from "@/src/domain/repositories/remainders.repository";


export class CreateRemainderUseCase {
    constructor(
        private readonly remaindersRepository: RemaindersRepository
    ){}

    async execute(remainder: Omit<Remainder, "id">): Promise<Remainder>{
        const newRemainder = await this.remaindersRepository.createRemainder(remainder);
        return newRemainder;
    }
}