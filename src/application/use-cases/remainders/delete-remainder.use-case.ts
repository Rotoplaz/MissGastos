import { RemaindersRepository } from '../../../domain/repositories/remainders.repository';


export class DeleteRemainderUseCase {

    constructor(
        private readonly remaindersRepository: RemaindersRepository
    ){}
    
    async execute(id: number): Promise<void> {
        await this.remaindersRepository.deleteRemainder(id);
    }
}