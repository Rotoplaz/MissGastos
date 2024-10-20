import { DebitCard } from "@/src/domain/entities/payment-methods.entity";
import { DebitCardRepository } from "@/src/domain/repositories/debit-cards.repository";
import * as SQLite from "expo-sqlite";
import { migrateDbIfNeeded } from "../db/migration";

export class DebitCardRepositoryImpl implements DebitCardRepository {
  private db: SQLite.SQLiteDatabase =
    SQLite.openDatabaseSync("MissGastosDataBase");

  constructor() {
    migrateDbIfNeeded(this.db);
  }

  async getDebitCardById(id: number): Promise<DebitCard | null> {
    const debitCard = await this.db.getFirstAsync<DebitCard>(
      "SELECT * FROM Card WHERE id = ?",
      [id]
    );
    if (!debitCard) {
      return null;
    }

    return debitCard;
  }

  async createDebitCard(card: Omit<DebitCard, "id">): Promise<DebitCard> {
    const { name, lastFourDigits, debt, currentBalance, type } = card;
    const debitCard = await this.db.runAsync(
      "INSERT INTO Card (name, lastFourDigits, debt, cardType, currentBalance) VALUES (?,?,?,?,?)",
      name,
      lastFourDigits,
      debt,
      type,
      currentBalance
    );
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
      fieldsToUpdate.push("cardType = ?");
      values.push(card.type);
    }

    const setClause = fieldsToUpdate.join(", ");
    values.push(id);

    if (setClause.length > 0) {
      await this.db.runAsync(
        `UPDATE Card SET ${setClause} WHERE id = ?`,
        ...values
      );
    }
    const updatedCard = await this.getDebitCardById(id);
    if (!updatedCard) {
      throw new Error("Card not found after update");
    }

    return updatedCard;
  }

  async deleteDebitCard(id: number): Promise<void> {
    try {
      await this.db.runAsync("DELETE FROM Card WHERE id = $id", { $id: id });
      return;
    } catch (error) {
      throw new Error("Card doesn't exist");
    }
  }

  async getAllDebitCards(): Promise<DebitCard[]> {
    const allDebitCards = await this.db.getAllAsync<DebitCard>(
      "SELECT * FROM Card"
    );
    return allDebitCards;
  }
}
