import { Income } from "@/src/domain/entities/income.entity";
import { IncomeRepository } from "@/src/domain/repositories/income.repository";
import * as SQLite from "expo-sqlite";
import { migrateDbIfNeeded } from "../db/migration";

export class IncomeSqliteRepositoryImpl implements IncomeRepository {
  private db: SQLite.SQLiteDatabase =
    SQLite.openDatabaseSync("MissGastosDataBase");

  constructor() {
    migrateDbIfNeeded(this.db);
  }

  async getIncomeById(id: number): Promise<Income | null> {
    const Income = await this.db.getFirstAsync<Income>(
      "SELECT * FROM Income WHERE id = ?",
      [id]
    );
    if (!Income) {
      return null;
    }

    return Income;
  }

  async createIncome(income: Omit<Income, "id">): Promise<Income> {
    const { amount, concept } = income;
    const date = new Date();
    const dateString = date.toLocaleString();
    const newIncome = await this.db.runAsync(
      "INSERT INTO Income (amount, concept, date) VALUES (?, ?, ?)",
      amount,
      concept ? concept : null,
      dateString
    );
    return {
      id: newIncome.lastInsertRowId,
      ...income,
    };
  }

  async updateIncome(id: number, income: Partial<Income>): Promise<Income> {
    const updates: string[] = [];
    const values: (string | number)[] = [];

    if (income.amount !== undefined) {
      updates.push("amount = ?");
      values.push(income.amount);
    }

    if (income.concept !== undefined) {
      updates.push("concept = ?");
      values.push(income.concept);
    }

    if (updates.length === 0) {
      throw new Error("No fields to update.");
    }

    const updateQuery = `UPDATE Income SET ${updates.join(", ")} WHERE id = ?`;
    values.push(id);

    await this.db.runAsync(updateQuery, ...values);

    const updatedIncome = await this.db.getFirstAsync<Income>(
      "SELECT * FROM Income WHERE id = ?",
      [id]
    );

    if (!updatedIncome) {
      throw new Error("Error updating Income with id ${id}.");
    }

    return updatedIncome;
  }

  async deleteIncome(id: number): Promise<void> {
    await this.db.runAsync("DELETE FROM Income WHERE id = $id", { $id: id });
    return;
  }

  async getAllIncome(): Promise<Income[]> {
    const allIncomes = await this.db.getAllAsync<Income>(
      "SELECT * FROM Income"
    );
    return allIncomes;
  }
}
