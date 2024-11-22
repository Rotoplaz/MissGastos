import { Category } from "@/src/domain/entities/category.entity";
import { Expense } from "@/src/domain/entities/expense.entity";
import { ExpenseRepository } from "@/src/domain/repositories/expense.repository";
import { ExpenseChartDto } from "@/src/application/dtos/expense-chart.dto";
import { getDataBase } from "../db/database";

export class ExpenseSqliteRepositoryImpl implements ExpenseRepository {
  async getExpensesGroupByCategory(): Promise<ExpenseChartDto[]> {
    const db = await getDataBase();
    const expensesGroupByCategory = await db.getAllAsync<{
      type: string;
      totalExpense: number;
      color: string;
    }>(`SELECT  c.color, c.type, SUM(e.amount) AS totalExpense 
            FROM Expense e
            JOIN Category c ON e.categoryId = c.id
            GROUP BY c.type;`);
    await db.closeAsync();
    return expensesGroupByCategory;
  }

  async getExpenseById(id: number): Promise<Expense | null> {
    const db = await getDataBase();
    const expense = await db.getFirstAsync<Expense>(
      "SELECT * FROM Expense WHERE id = ?",
      [id]
    );
    if (!expense) {
      await db.closeAsync();
      return null;
    }
    await db.closeAsync();
    return expense;
  }
  async createExpense(expense: Omit<Expense, "id">): Promise<Expense> {
    const { amount, concept, category, date } = expense;
    // console.log(expense)
    const db = await getDataBase();
    switch (expense.paymentMethod.type) {
      case "credit": {
        const infoDatabse = await db.runAsync(
          "INSERT INTO Expense (amount, concept, categoryId, paymentMethod, cardId, date) VALUES (?,?,?,?,?,?)",
          amount,
          concept ? concept : null,
          category.id,
          expense.paymentMethod.type,
          expense.paymentMethod.id,
          date.toISOString().split("T")[0]
        );
        await db.closeAsync();
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
        const infoDatabse = await db.runAsync(
          "INSERT INTO Expense (amount, concept, categoryId, paymentMethod, cardId,date) VALUES (?,?,?,?,?,?)",
          amount,
          concept ? concept : null,
          category.id,
          expense.paymentMethod.type,
          null,
          date.toISOString().split("T")[0]
        );
        await db.closeAsync();
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
        const infoDatabse = await db.runAsync(
          "INSERT INTO Expense (amount, concept, categoryId, paymentMethod, cardId, date) VALUES (?,?,?,?,?,?)",
          amount,
          concept ? concept : null,
          category.id,
          expense.paymentMethod.type,
          expense.paymentMethod.id,
          date.toISOString().split("T")[0]
        );
        await db.closeAsync();
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
        await db.closeAsync();
        throw new Error("PaymentMethod not allowed");
    }
  }

  async updateExpense(id: number, expense: Partial<Expense>): Promise<Expense> {
    const updates: string[] = [];
    const values: (string | number | null)[] = [];
    const db = await getDataBase();

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

        const updateQuery = `UPDATE Expense SET ${updates.join(
          ", "
        )} WHERE id = ?`;
        values.push(id);
        await db.runAsync(updateQuery, ...values);

        const updatedExpense = await db.getFirstAsync<Expense>(
          "SELECT * FROM Expense WHERE id = ?",
          [id]
        );
        if (!updatedExpense) {
          await db.closeAsync();
          throw new Error("Error updating Income with id ${id}.");
        }
        await db.closeAsync();
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

        const updateQuery = `UPDATE Expense SET ${updates.join(
          ", "
        )} WHERE id = ?`;
        values.push(id);
        await db.runAsync(updateQuery, ...values);

        const updatedExpense = await db.getFirstAsync<Expense>(
          "SELECT * FROM Expense WHERE id = ?",
          [id]
        );
        if (!updatedExpense) {
          await db.closeAsync();
          throw new Error("Error updating Income with id ${id}.");
        }
        await db.closeAsync();
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

        const updateQuery = `UPDATE Expense SET ${updates.join(
          ", "
        )} WHERE id = ?`;
        values.push(id);
        await db.runAsync(updateQuery, ...values);

        const updatedExpense = await db.getFirstAsync<Expense>(
          "SELECT * FROM Expense WHERE id = ?",
          [id]
        );
        if (!updatedExpense) {
          await db.closeAsync();
          throw new Error("Error updating Income with id ${id}.");
        }
        await db.closeAsync();
        return updatedExpense;
      }
      default:
        await db.closeAsync();
        throw new Error("PaymentMethod not allowed");
    }
  }
  async deleteExpense(id: number): Promise<void> {
    const db = await getDataBase();
    await db.runAsync("DELETE FROM Expense WHERE id = $id", { $id: id });
    await db.closeAsync();
    return;
  }
  async getAllExpenses(): Promise<Expense[]> {
    const db = await getDataBase();
    const allExpense = await db.getAllAsync<Expense>("SELECT * FROM Expense");
    await db.closeAsync();
    return allExpense;
  }
  async getExpensesByCategory?(category: Category): Promise<Expense[]> {
    const db = await getDataBase();
    const allExpense = await db.getAllAsync<Expense>(
      "SELECT * FROM Expense WHERE categoryId = ?",
      [category.id]
    );
    await db.closeAsync();
    return allExpense;
  }

  async getExpensesByDateRange(
    startDate: Date,
    endDate: Date
  ): Promise<Expense[]> {
    const db = await getDataBase();
    const formattedStartDate = startDate.toISOString().split("T")[0];
    const formattedEndDate = endDate.toISOString().split("T")[0];
    const dateExpenses = await db.getAllAsync<Expense>(
      "SELECT * FROM Expense WHERE date BETWEEN ? AND ? ORDER BY date",
      [formattedStartDate, formattedEndDate]
    );
    await db.closeAsync();
    return dateExpenses;
  }
}
