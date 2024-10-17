import { Remainder } from "@/src/domain/entities/reminders.entity";
import { RemaindersRepository } from "@/src/domain/repositories/remainders.repository";


export class GetAllRemaindersUseCase {

    constructor(
        private readonly remaindersRepository: RemaindersRepository
    ){}

    async execute(): Promise<Remainder[]> {
        const remainders = await this.remaindersRepository.getAllRemainders();
        return remainders;
    }
}