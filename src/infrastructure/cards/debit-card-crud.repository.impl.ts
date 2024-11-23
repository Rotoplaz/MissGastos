import { DebitCard } from "@/src/domain/entities/payment-methods.entity";
import { DebitCardRepository } from "@/src/domain/repositories/debit-cards.repository";
import { getDataBase } from "../db/database";

export class DebitCardRepositoryImpl implements DebitCardRepository {
  async getDebitCardById(id: number): Promise<DebitCard | null> {
    const db = await getDataBase();
    const debitCard = await db.getFirstAsync<DebitCard>(
      "SELECT * FROM Card WHERE id = ?",
      [id]
    );
    if (!debitCard) {
      await db.closeAsync();
      return null;
    }
    await db.closeAsync();
    return debitCard;
  }

  async createDebitCard(card: Omit<DebitCard, "id">): Promise<DebitCard> {
    const { name, lastFourDigits, debt, currentBalance, type, limitDebit } =
      card;
    const db = await getDataBase();
    const debitCard = await db.runAsync(
      "INSERT INTO Card (name, lastFourDigits, debt, type, currentBalance, limitDebit) VALUES (?,?,?,?,?,?)",
      name,
      lastFourDigits,
      debt,
      type,
      currentBalance,
      limitDebit
    );
    await db.closeAsync();
    return {
      id: debitCard.lastInsertRowId,
      ...card,
    };
  }

  async updateDebitCard(
    id: number,
    card: Partial<DebitCard>
  ): Promise<DebitCard> {
    const fieldsToUpdate: string[] = [];
    const values: any[] = [];
    const db = await getDataBase();
    const currentCard = await this.getDebitCardById(id);

    if (!currentCard) {
      await db.closeAsync();
      throw new Error("card not found");
    }
    if (card.name !== undefined) {
      fieldsToUpdate.push("name = ?");
      values.push(card.name);
    }

    if (card.lastFourDigits !== undefined) {
      fieldsToUpdate.push("lastFourDigits = ?");
      values.push(card.lastFourDigits);
    }

    if (card.debt !== undefined) {
      fieldsToUpdate.push("debt = ?");
      values.push(card.debt);
    }

    if (card.currentBalance !== undefined) {
      fieldsToUpdate.push("currentBalance = ?");
      values.push(card.currentBalance);
    }

    if (card.type !== undefined) {
      fieldsToUpdate.push("type = ?");
      values.push(card.type);
    }

    const setClause = fieldsToUpdate.join(", ");
    values.push(id);

    if (setClause.length > 0) {
      await db.runAsync(`UPDATE Card SET ${setClause} WHERE id = ?`, ...values);
    }
    const updatedCard = await this.getDebitCardById(id);
    if (!updatedCard) {
      await db.closeAsync();
      throw new Error("Card not found after update");
    }

    await db.closeAsync();
    return updatedCard;
  }

  async deleteDebitCard(id: number): Promise<void> {
    const db = await getDataBase();
    try {
      await db.runAsync("DELETE FROM Card WHERE id = $id", { $id: id });
      return;
    } catch (error) {
      throw new Error("Card doesn't exist");
    } finally {
      await db.closeAsync();
    }
  }

  async getAllDebitCards(): Promise<DebitCard[]> {
    const db = await getDataBase();
    const allDebitCards = await db.getAllAsync<DebitCard>(
      "SELECT * FROM Card WHERE type = 'debit'"
    );
    await db.closeAsync();
    return allDebitCards;
  }
}
