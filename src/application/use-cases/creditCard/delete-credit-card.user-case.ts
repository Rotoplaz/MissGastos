import { CreditCardRepository } from "@/src/domain/repositories/credit-cards.repository";

export class DeleteCreditCardUseCase {
  constructor(private readonly creditCardRepository: CreditCardRepository) {}

  async execute(id: number): Promise<void> {
    const removingCard = await this.creditCardRepository.deleteCreditCard(id);
    return removingCard;
  }
}
