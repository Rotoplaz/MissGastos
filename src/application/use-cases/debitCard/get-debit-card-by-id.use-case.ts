import { DebitCard } from "@/src/domain/entities/payment-methods.entity";
import { DebitCardRepository } from "@/src/domain/repositories/debit-cards.repository";

export class GetDebitCardByIdUseCase {
  constructor(private readonly debitCardRepository: DebitCardRepository) {}

  async execute(id: number): Promise<DebitCard | null> {
    const debitCard = await this.debitCardRepository.getDebitCardById(id);

    return debitCard;
  }
}
