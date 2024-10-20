import { CreditCard } from "@/src/domain/entities/payment-methods.entity";
import { CreditCardRepository } from "@/src/domain/repositories/credit-cards.repository";

export class UpdateCreditCardUserCase {
  constructor(private readonly creditCardReposito: CreditCardRepository) {}

  async execute(id: number, card: Partial<CreditCard>): Promise<CreditCard> {
    const cardUpdate = await this.creditCardReposito.updateCreditCard(id, card);
    return cardUpdate;
  }
}
