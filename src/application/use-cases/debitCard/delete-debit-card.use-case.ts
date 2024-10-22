import { DebitCardRepository } from "@/src/domain/repositories/debit-cards.repository";

export class DeleteDebitCardUseCase {
  constructor(private readonly debitCardRepository: DebitCardRepository) {}

  async execute(id: number): Promise<void> {
    const cardRemoved = await this.debitCardRepository.deleteDebitCard(id);
    return cardRemoved;
  }
}
