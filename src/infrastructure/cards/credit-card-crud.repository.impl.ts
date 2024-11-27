import { CreditCard } from "@/src/domain/entities/payment-methods.entity";
import { CreditCardRepository } from "@/src/domain/repositories/credit-cards.repository";
import { getDataBase } from "../db/database";

export class CreditCardCrudRepositoryImpl implements CreditCardRepository {
  async getCreditCardById(id: number): Promise<CreditCard | null> {
    const db = await getDataBase();
    const creditCard = await db.getFirstAsync<CreditCard>(
      "SELECT * FROM Card WHERE id = ?",
      [id]
    );
    if (!creditCard) {
      await db.closeAsync();
      return null;
    }

    await db.closeAsync();
    return { ...creditCard, dueDate: new Date(creditCard.dueDate) };
  }

  async createCreditCard(card: Omit<CreditCard, "id">): Promise<CreditCard> {
    const { name, lastFourDigits, debt, creditLimit, type, dueDate } = card;
    const db = await getDataBase();
    const creditCard = await db.runAsync(
      "INSERT INTO Card (name, lastFourDigits, debt, type, creditLimit, dueDate) VALUES (?,?,?,?,?,?)",
      name,
      lastFourDigits,
      debt,
      type,
      creditLimit,
      dueDate.toISOString().split("T")[0]
    );
    const cardCreated = await this.getCreditCardById(creditCard.lastInsertRowId);
    await db.closeAsync();
    return cardCreated!;
  }

  async updateCreditCard(
    id: number,
    card: Partial<CreditCard>
  ): Promise<CreditCard> {
    const db = await getDataBase();
    const fieldsToUpdate: string[] = [];
    const values: any[] = [];
    const currentCard = await this.getCreditCardById(id);

    if (!currentCard) {
      await db.closeAsync();
      throw new Error("card not found");
    }
    if (card.dueDate !== undefined) {
      fieldsToUpdate.push("dueDate = ?");
      values.push(card.dueDate.toISOString().split("T")[0]);
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

    if (card.creditLimit !== undefined) {
      fieldsToUpdate.push("creditLimit = ?");
      values.push(card.creditLimit);
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
    
    const updatedCard = await this.getCreditCardById(id);
    if (!updatedCard) {
      await db.closeAsync();
      throw new Error("Card not found after update");
    }
    await db.closeAsync();
    return updatedCard;
  }

  async deleteCreditCard(id: number): Promise<void> {
    const db = await getDataBase();
    try {
      await db.runAsync("DELETE FROM Expense WHERE cardId = $id", { $id: id });
      await db.runAsync("DELETE FROM Card WHERE id = $id", { $id: id });
      return;
    } catch (error) {
      throw new Error("Card doesn't exist");
    } finally {
      await db.closeAsync();
    }
  }
  async getAllCreditCards(): Promise<CreditCard[]> {
    const db = await getDataBase();
    const allCreditCards = await db.getAllAsync<CreditCard>(
      "SELECT * FROM Card WHERE type = 'credit'"
    );
    await db.closeAsync();
    return allCreditCards;
  }
}

