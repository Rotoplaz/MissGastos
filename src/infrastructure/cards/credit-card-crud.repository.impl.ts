import { CreditCard } from "@/src/domain/entities/payment-methods.entity";
import { CreditCardRepository } from "@/src/domain/repositories/credit-cards.repository";
import * as SQLite from "expo-sqlite";

export class CreditCardCrudRepositoryImpl implements CreditCardRepository {
  private db: SQLite.SQLiteDatabase =
    SQLite.openDatabaseSync("MissGastosDataBase");

  async getCreditCardById(id: number): Promise<CreditCard | null> {
    const creditCard = await this.db.getFirstAsync<CreditCard>(
      "SELECT * FROM Card WHERE id = ?",
      [id]
    );
    if (!creditCard) {
      return null;
    }
    return { ...creditCard, dueDate: new Date(creditCard.dueDate) };
  }

  async createCreditCard(card: Omit<CreditCard, "id">): Promise<CreditCard> {
    const { name, lastFourDigits, debt, creditLimit, type, dueDate } = card;
    const creditCard = await this.db.runAsync(
      "INSERT INTO Card (name, lastFourDigits, debt, cardType, creditLimit, dueDate) VALUES (?,?,?,?,?,?)",
      name,
      lastFourDigits,
      debt,
      type,
      creditLimit,
      dueDate.toISOString().split("T")[0]
    );
    return {
      id: creditCard.lastInsertRowId,
      ...card,
    };
  }
  async updateCreditCard(
    id: number,
    card: Partial<CreditCard>
  ): Promise<CreditCard> {
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

    if (card.creditLimit !== undefined) {
      fieldsToUpdate.push("currentBalance = ?");
      values.push(card.creditLimit);
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
    const updatedCard = await this.getCreditCardById(id);
    if (!updatedCard) {
      throw new Error("Card not found after update");
    }

    return updatedCard;
  }
  async deleteCreditCard(id: number): Promise<void> {
    try {
      await this.db.runAsync("DELETE FROM Card WHERE id = $id", { $id: id });
      return;
    } catch (error) {
      throw new Error("Card doesn't exist");
    }
  }
  async getAllCreditCards(): Promise<CreditCard[]> {
    const allCreditCards = await this.db.getAllAsync<CreditCard>(
      "SELECT * FROM Card WHERE cardType = 'credit'"
    );
    return allCreditCards;
  }
}
