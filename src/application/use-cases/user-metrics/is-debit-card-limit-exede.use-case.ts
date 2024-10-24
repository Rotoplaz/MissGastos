import { DebitCardRepository } from "@/src/domain/repositories/debit-cards.repository";
import { UserMetricsService } from "@/src/domain/services/user-metrics.service";

export class IsDebitCardLimitExedeUseCase {
    constructor(
        private readonly userMetricsService:UserMetricsService,
        private readonly debitCardRepository:DebitCardRepository
    ){}
    
    async export(id:number){
        const debitCard = await this.debitCardRepository.getDebitCardById(id);
        if (!debitCard) {
            throw new Error('Debit card not found');
        }
        const isDebitCardLimitExede = this.userMetricsService.isDebitCardLimitExede(debitCard);
        return isDebitCardLimitExede
    }
        
}