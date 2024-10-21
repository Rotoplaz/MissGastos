import { DebitCard } from "@/src/domain/entities/payment-methods.entity";
import { DebitCardRepository } from "@/src/domain/repositories/debit-cards.repository";

export class GetAllDebitCardsUseCase {
  constructor(private readonly debitCardRepository: DebitCardRepository) {}

  async execute(): Promise<DebitCard[]> {
    const cards = await this.debitCardRepository.getAllDebitCards();
    return cards;
  }
}
