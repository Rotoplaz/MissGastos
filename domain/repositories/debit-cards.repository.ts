import { DebitCard } from "../entities/payment-methods.entity";


export interface DebitCardRepository {
    getDebitCardById(id: number): Promise<DebitCard | null>;
    createDebitCard(card: Omit<DebitCard, "id">): Promise<DebitCard>;
    updateDebitCard(id: number, card: Partial<DebitCard>): Promise<DebitCard>;
    deleteDebitCard(id: number): Promise<void>;
    getAllDebitCards(): Promise<DebitCard[]>;
}
