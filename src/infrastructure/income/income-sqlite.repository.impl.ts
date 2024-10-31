import { Income } from "@/src/domain/entities/income.entity";
import { IncomeRepository } from "@/src/domain/repositories/income.repository";
import { getDataBase } from "../db/database";
export class IncomeSqliteRepositoryImpl implements IncomeRepository {

  async getIncomeById(id: number): Promise<Income | null> {
    const db = await getDataBase();
    const Income = await db.getFirstAsync<Income>(
      "SELECT * FROM Income WHERE id = ?",
      [id]
    );
    if (!Income) {
      return null;
    }

    return Income;
  }

  async createIncome(income: Omit<Income, "id">): Promise<Income> {
    const { amount, concept, date } = income;
    const db = await getDataBase();
    const newIncome = await db.runAsync(
      "INSERT INTO Income (amount, concept, date) VALUES (?, ?, ?)",
      amount,
      concept ? concept : null,
      date.toISOString().split("T")[0]
    );
    return {
      id: newIncome.lastInsertRowId,
      ...income,
    };
  }

  async updateIncome(id: number, income: Partial<Income>): Promise<Income> {
    const updates: string[] = [];
    const values: (string | number)[] = [];
    const db = await getDataBase();

    if (income.amount !== undefined) {
      updates.push("amount = ?");
      values.push(income.amount);
    }

    if (income.concept !== undefined) {
      updates.push("concept = ?");
      values.push(income.concept);
    }

    if (income.date !== undefined) {
      updates.push("concept = ?");
      values.push(income.date.toISOString().split("T")[0]);
    }

    if (updates.length === 0) {
      throw new Error("No fields to update.");
    }

    const updateQuery = `UPDATE Income SET ${updates.join(", ")} WHERE id = ?`;
    values.push(id);

    await db.runAsync(updateQuery, ...values);

    const updatedIncome = await db.getFirstAsync<Income>(
      "SELECT * FROM Income WHERE id = ?",
      [id]
    );

    if (!updatedIncome) {
      throw new Error("Error updating Income with id ${id}.");
    }

    return updatedIncome;
  }

  async deleteIncome(id: number): Promise<void> {
    const db = await getDataBase();
    await db.runAsync("DELETE FROM Income WHERE id = $id", { $id: id });
    return;
  }

  async getAllIncome(): Promise<Income[]> {
    const db = await getDataBase();
    const allIncomes = await db.getAllAsync<Income>(
      "SELECT * FROM Income"
    );
    return allIncomes;
  }

  async getIncomesByDateRange(
    startDate: Date,
    endDate: Date
  ): Promise<Income[]> {
    const db = await getDataBase();
    const formattedStartDate = startDate.toISOString().split("T")[0];
    const formattedEndDate = endDate.toISOString().split("T")[0];
    const dateIncomes = await db.getAllAsync<Income>(
      "SELECT * FROM Income WHERE date BETWEEN ? AND ? ORDER BY date",
      [formattedStartDate, formattedEndDate]
    );
    return dateIncomes;
  }
}
