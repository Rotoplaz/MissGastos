import { CreditCard } from "@/src/domain/entities/payment-methods.entity";
import { CreditCardRepository } from "@/src/domain/repositories/credit-cards.repository";

export class CreateCreditCardUseCase {
  constructor(private readonly creditCardRepository: CreditCardRepository) {}

  async execute(card: Omit<CreditCard, "id">): Promise<CreditCard> {
    const newCard = await this.creditCardRepository.createCreditCard(card);
    return newCard;
  }
}
