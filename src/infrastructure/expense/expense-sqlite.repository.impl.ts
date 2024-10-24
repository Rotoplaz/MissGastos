import { Category } from "@/src/domain/entities/category.entity";
import { Expense } from "@/src/domain/entities/expense.entity";
import { ExpenseRepository } from "@/src/domain/repositories/expense.repository";
import * as SQLite from "expo-sqlite";
import { migrateDbIfNeeded } from "../db/migration";

export class ExpenseSqliteRepositoryImpl implements ExpenseRepository {
  private db: SQLite.SQLiteDatabase =
    SQLite.openDatabaseSync("MissGastosDataBase");

  constructor() {
    migrateDbIfNeeded(this.db);
  }
  async getExpensesGroupByCategory(): Promise<
    { type: string; totalExpense: number }[]
  > {
    const expensesGroupByCategory = await this.db.getAllAsync<{
      type: string;
      totalExpense: number;
    }>(`SELECT c.type, SUM(e.amount) AS totalExpense 
            FROM Expense e
            JOIN Category c ON e.categoryId = c.id
            GROUP BY c.type;`);
    return expensesGroupByCategory;
  }

  async getExpenseById(id: number): Promise<Expense | null> {
    const expense = await this.db.getFirstAsync<Expense>(
      "SELECT * FROM Expense WHERE id = ?",
      [id]
    );
    if (!expense) {
      return null;
    }

    return expense;
  }
  async createExpense(expense: Omit<Expense, "id">): Promise<Expense> {
    const { amount, concept, category, date } = expense;

    switch (expense.paymentMethod.type) {
      case "credit": {
        const infoDatabse = await this.db.runAsync(
          "INSERT INTO Expense (amount, concept, categoryId, paymentMethod, cardId, date) VALUES ",
          amount,
          concept ? concept : null,
          category.id,
          expense.paymentMethod.type,
          expense.paymentMethod.id,
          date.toISOString().split("T")[0]
        );

        return {
          id: infoDatabse.lastInsertRowId,
          amount,
          category,
          paymentMethod: expense.paymentMethod,
          concept,
          date,
        };
      }
      case "cash": {
        const infoDatabse = await this.db.runAsync(
          "INSERT INTO Expense (amount, concept, categoryId, paymentMethod, cardId) VALUES ",
          amount,
          concept ? concept : null,
          category.id,
          expense.paymentMethod.type,
          null,
          date.toISOString().split("T")[0]
        );

        return {
          id: infoDatabse.lastInsertRowId,
          amount,
          category,
          paymentMethod: expense.paymentMethod,
          concept,
          date,
        };
      }
      case "debit": {
        const infoDatabse = await this.db.runAsync(
          "INSERT INTO Expense (amount, concept, categoryId, paymentMethod, cardId) VALUES ",
          amount,
          concept ? concept : null,
          category.id,
          expense.paymentMethod.type,
          expense.paymentMethod.id,
          date.toISOString().split("T")[0]
        );

        return {
          id: infoDatabse.lastInsertRowId,
          amount,
          category,
          paymentMethod: expense.paymentMethod,
          concept,
          date,
        };
      }

      default:
        throw new Error("PaymentMethod not allowed");
    }
  }

  async updateExpense(id: number, expense: Partial<Expense>): Promise<Expense> {
    const updates: string[] = [];
    const values: (string | number | null)[] = [];

    switch (expense.paymentMethod?.type) {
      case "credit": {
        if (expense.amount !== undefined) {
          updates.push("amount = ?");
          values.push(expense.amount);
        }
        if (expense.concept !== undefined) {
          updates.push("concept = ?");
          values.push(expense.concept);
        }
        if (expense.category !== undefined) {
          updates.push("categoryId = ?");
          values.push(expense.category.id);
        }
        if (expense.paymentMethod.type !== undefined) {
          updates.push("paymentMethod = ?");
          values.push(expense.paymentMethod.type);
        }
        if (expense.paymentMethod.id !== undefined) {
          updates.push("cardId = ?");
          values.push(expense.paymentMethod.id);
        }
        if (expense.date !== undefined) {
          updates.push("date = ?");
          values.push(expense.date.toISOString().split("T")[0]);
        }

        const updateQuery = `UPDATE Expense SET ${updates.join(", ")} WHERE id = ?`;
        values.push(id);
        await this.db.runAsync(updateQuery, ...values);

        const updatedExpense = await this.db.getFirstAsync<Expense>(
          "SELECT * FROM Expense WHERE id = ?",
          [id]
        );
        if (!updatedExpense) {
          throw new Error("Error updating Income with id ${id}.");
        }

        return updatedExpense;
      }

      case "cash": {
        if (expense.amount !== undefined) {
          updates.push("amount = ?");
          values.push(expense.amount);
        }
        if (expense.concept !== undefined) {
          updates.push("concept = ?");
          values.push(expense.concept);
        }
        if (expense.category !== undefined) {
          updates.push("categoryId = ?");
          values.push(expense.category.id);
        }
        if (expense.paymentMethod.type !== undefined) {
          updates.push("paymentMethod = ?");
          values.push(expense.paymentMethod.type);
        }
        if (expense.date !== undefined) {
          updates.push("date = ?");
          values.push(expense.date.toISOString().split("T")[0]);
        }

        updates.push("cardId = ?");
        values.push(null);

        const updateQuery = `UPDATE Expense SET ${updates.join(", ")} WHERE id = ?`;
        values.push(id);
        await this.db.runAsync(updateQuery, ...values);

        const updatedExpense = await this.db.getFirstAsync<Expense>(
          "SELECT * FROM Expense WHERE id = ?",
          [id]
        );
        if (!updatedExpense) {
          throw new Error("Error updating Income with id ${id}.");
        }

        return updatedExpense;
      }

      case "debit": {
        if (expense.amount !== undefined) {
          updates.push("amount = ?");
          values.push(expense.amount);
        }
        if (expense.concept !== undefined) {
          updates.push("concept = ?");
          values.push(expense.concept);
        }
        if (expense.category !== undefined) {
          updates.push("categoryId = ?");
          values.push(expense.category.id);
        }
        if (expense.paymentMethod.type !== undefined) {
          updates.push("paymentMethod = ?");
          values.push(expense.paymentMethod.type);
        }
        if (expense.paymentMethod.id !== undefined) {
          updates.push("cardId = ?");
          values.push(expense.paymentMethod.id);
        }
        if (expense.date !== undefined) {
          updates.push("date = ?");
          values.push(expense.date.toISOString().split("T")[0]);
        }

        const updateQuery = `UPDATE Expense SET ${updates.join(", ")} WHERE id = ?`;
        values.push(id);
        await this.db.runAsync(updateQuery, ...values);

        const updatedExpense = await this.db.getFirstAsync<Expense>(
          "SELECT * FROM Expense WHERE id = ?",
          [id]
        );
        if (!updatedExpense) {
          throw new Error("Error updating Income with id ${id}.");
        }

        return updatedExpense;
      }
      default:
        throw new Error("PaymentMethod not allowed");
    }
  }
  async deleteExpense(id: number): Promise<void> {
    await this.db.runAsync("DELETE FROM Expense WHERE id = $id", { $id: id });
    return;
  }
  async getAllExpenses(): Promise<Expense[]> {
    const allExpense = await this.db.getAllAsync<Expense>(
      "SELECT * FROM Expense"
    );
    return allExpense;
  }
  async getExpensesByCategory?(category: Category): Promise<Expense[]> {
    const allExpense = await this.db.getAllAsync<Expense>(
      "SELECT * FROM Expense WHERE categoryId = ?",
      [category.id]
    );
    return allExpense;
  }
}
