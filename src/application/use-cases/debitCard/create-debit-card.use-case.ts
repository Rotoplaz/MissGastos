import { DebitCard } from "@/src/domain/entities/payment-methods.entity";
import { DebitCardRepository } from "@/src/domain/repositories/debit-cards.repository";

export class CreateDebitCardUseCase {
  constructor(private readonly debitCardRepository: DebitCardRepository) {}

  async execute(card: Omit<DebitCard, "id">) {
    const newCard = await this.debitCardRepository.createDebitCard(card);
    return newCard;
  }
}
