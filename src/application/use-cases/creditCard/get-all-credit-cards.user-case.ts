import { CreditCard } from "@/src/domain/entities/payment-methods.entity";
import { CreditCardRepository } from "@/src/domain/repositories/credit-cards.repository";

export class GetAllCreditsCardsUseCase {
  constructor(private readonly creditCardRepository: CreditCardRepository) {}

  async execute(): Promise<CreditCard[]> {
    const cards = await this.creditCardRepository.getAllCreditCards();
    return cards;
  }
}
