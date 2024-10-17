import { CreditCard } from "../entities/payment-methods.entity";

export interface CreditCardRepository {
    getCreditCardById(id: number): Promise<CreditCard | null>;
    createCreditCard(card: Omit<CreditCard, "id">): Promise<CreditCard>;
    updateCreditCard(id: number, card: Partial<CreditCard>): Promise<CreditCard>;
    deleteCreditCard(id: number): Promise<void>;
    getAllCreditCards(): Promise<CreditCard[]>;
}
