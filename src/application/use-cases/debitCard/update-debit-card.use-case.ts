import { DebitCard } from "@/src/domain/entities/payment-methods.entity";
import { DebitCardRepository } from "@/src/domain/repositories/debit-cards.repository";

export class UpdateDebitCardUseCase {
  constructor(private readonly debitCardRepository: DebitCardRepository) {}

  async execute(id: number, card: Partial<DebitCard>): Promise<DebitCard> {
    const cardUpdate = await this.debitCardRepository.updateDebitCard(id, card);
    return cardUpdate;
  }
}
