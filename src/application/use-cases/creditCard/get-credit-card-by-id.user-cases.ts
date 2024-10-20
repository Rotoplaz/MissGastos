import { CreditCard } from "@/src/domain/entities/payment-methods.entity";
import { CreditCardRepository } from "@/src/domain/repositories/credit-cards.repository";

export class GetCreditCardByIdUseCase {
  constructor(private readonly creditCardRepository: CreditCardRepository) {}

  async execute(id: number): Promise<CreditCard | null> {
    const card = await this.creditCardRepository.getCreditCardById(id);
    return card;
  }
}
