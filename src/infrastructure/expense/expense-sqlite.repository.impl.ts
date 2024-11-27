import { Category } from "@/src/domain/entities/category.entity";
import { Expense } from "@/src/domain/entities/expense.entity";
import { ExpenseRepository } from "@/src/domain/repositories/expense.repository";
import { ExpenseChartDto } from "@/src/application/dtos/expense-chart.dto";
import { getDataBase } from "../db/database";

export class ExpenseSqliteRepositoryImpl implements ExpenseRepository {
  async getExpensesGroupByCategory(): Promise<ExpenseChartDto[]> {
    const db = await getDataBase();
    try {
      const expensesGroupByCategory = await db.getAllAsync<{
        type: string;
        totalExpense: number;
        color: string;
      }>(
        "SELECT c.color, c.type, SUM(e.amount) AS totalExpense FROM Expense e JOIN Category c ON e.categoryId = c.id GROUP BY c.type;"
      );
      return expensesGroupByCategory;
    } catch (error) {
      throw new Error("Error getting expenses group by category: " + error);
    } finally {
      await db.closeAsync();
    }
  }

  async getExpenseById(id: number): Promise<Expense | null> {
    const db = await getDataBase();
    try {
      const query = `
        SELECT 
          e.id AS expenseId,
          e.amount,
          e.concept,
          e.date,
          e.paymentMethod,
          c.id AS categoryId,
          c.type AS categoryName,
          c.color AS categoryColor,
          c.icon AS categoryIcon,
          ca.id AS cardId,
          ca.name AS cardName,
          ca.lastFourDigits,
          ca.type AS cardType,
          ca.debt AS cardDebt,
          ca.creditLimit,
          ca.dueDate,
          ca.currentBalance,
          ca.limitDebit
        FROM 
          Expense e
        LEFT JOIN 
          Category c ON e.categoryId = c.id
        LEFT JOIN 
          Card ca ON e.cardId = ca.id
        WHERE 
          e.id = ?
      `;
      const expenseRow = await db.getFirstAsync<any>(query, [id]);

      if (!expenseRow) {
        return null;
      }

      const expense: Expense = {
        id: expenseRow.expenseId,
        amount: expenseRow.amount,
        concept: expenseRow.concept,
        date: new Date(expenseRow.date),
        paymentMethod:
          expenseRow.paymentMethod === "cash"
            ? { type: "cash" }
            : expenseRow.paymentMethod === "credit"
            ? {
                id: expenseRow.cardId,
                name: expenseRow.cardName,
                lastFourDigits: expenseRow.lastFourDigits,
                debt: expenseRow.cardDebt,
                creditLimit: expenseRow.creditLimit,
                dueDate: expenseRow.dueDate
                  ? new Date(expenseRow.dueDate)
                  : new Date(),
                type: "credit",
              }
            : {
                id: expenseRow.cardId,
                name: expenseRow.cardName,
                lastFourDigits: expenseRow.lastFourDigits,
                debt: expenseRow.cardDebt,
                currentBalance: expenseRow.currentBalance,
                limitDebit: expenseRow.limitDebit,
                type: "debit",
              },
        category: {
          id: expenseRow.categoryId,
          type: expenseRow.categoryName,
          color: expenseRow.categoryColor,
          icon: expenseRow.categoryIcon,
        },
        type: "expense",
      };
      return expense;
    } catch (error) {
      throw new Error("Error getting expense by id: " + error);
    } finally {
      await db.closeAsync();
    }
  }

  async createExpense(expense: Omit<Expense, "id">): Promise<Expense> {
    const { amount, concept, category, date } = expense;
    const db = await getDataBase();
    let infoDatabse;
    try {
      let query = "";
      let params: any[] = [];

      switch (expense.paymentMethod.type) {
        case "credit":
          query =
            "INSERT INTO Expense (amount, concept, categoryId, paymentMethod, cardId, date) VALUES (?,?,?,?,?,?)";
          params = [
            amount,
            concept || null,
            category.id,
            expense.paymentMethod.type,
            expense.paymentMethod.id,
            date.toISOString().split("T")[0],
          ];
          infoDatabse = await db.runAsync(query, ...params);

          const updateCreditCardQuery = `
          UPDATE Card 
          SET debt = debt + ? 
          WHERE id = ? AND type = 'credit'
        `;
          await db.runAsync(
            updateCreditCardQuery,
            amount,
            expense.paymentMethod.id
          );
          break;

        case "debit":
          query =
            "INSERT INTO Expense (amount, concept, categoryId, paymentMethod, cardId, date) VALUES (?,?,?,?,?,?)";
          params = [
            amount,
            concept || null,
            category.id,
            expense.paymentMethod.type,
            expense.paymentMethod.id,
            date.toISOString().split("T")[0],
          ];
          infoDatabse = await db.runAsync(query, ...params);
          const updateDebitCardQuery = `
        UPDATE Card 
        SET currentBalance = currentBalance - ?, 
            debt = debt +  ?
        WHERE id = ? AND type = 'debit'
      `;
          await db.getAllAsync(
            updateDebitCardQuery,
            amount,
            amount,            
            expense.paymentMethod.id
          );
          

          break;

        case "cash":
          query =
            "INSERT INTO Expense (amount, concept, categoryId, paymentMethod, cardId, date) VALUES (?,?,?,?,?,?)";
          params = [
            amount,
            concept || null,
            category.id,
            expense.paymentMethod.type,
            null,
            date.toISOString().split("T")[0],
          ];
          infoDatabse = await db.runAsync(query, ...params);
          break;

        default:
          throw new Error("PaymentMethod not allowed");
      }
      const expenseCreated = await this.getExpenseById(infoDatabse!.lastInsertRowId);
      console.log(expenseCreated)
      return expenseCreated!;
    } catch (error) {
      throw new Error("Error creating expense: " + error);
    } finally {
      await db.closeAsync();
    }
  }
  async updateExpense(id: number, expense: Partial<Expense>): Promise<Expense> {
    const updates: string[] = [];
    const values: (string | number | null)[] = [];
    const db = await getDataBase();
    try {
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

          const totalDebtQuery = `
        SELECT SUM(amount) as totalDebt
        FROM Expense
        WHERE cardId = ? AND paymentMethod = ?
      `;
          const debtRow = await db.getAllAsync(
            totalDebtQuery,
            expense.paymentMethod.id!,
            expense.paymentMethod.type
          );
          const totalDebt = (debtRow as any)[0].totalDebt || 0;

          const updateCreditCardQuery = `
        UPDATE Card 
        SET debt = ? 
        WHERE id = ? AND type = 'credit'
      `;
          await db.runAsync(
            updateCreditCardQuery,
            totalDebt as any,
            expense.paymentMethod.id
          );

          const updatedExpense = await this.getExpenseById(id);

          if (!updatedExpense) {
            await db.closeAsync();
            throw new Error("Error updating Expense with id ${id}.");
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

          const updatedExpense = await this.getExpenseById(id);
          if (!updatedExpense) {
            await db.closeAsync();
            throw new Error("Error updating Expense with id ${id}.");
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

          const totalDebtQuery = `

        SELECT SUM(amount) as totalDebt
        FROM Expense
        WHERE cardId = ? AND paymentMethod = 'debit'
      `;
          const debtRow = await db.getAllAsync(
            totalDebtQuery,
            expense.paymentMethod.id!,
          );
          const totalDebt = (debtRow as any)[0].totalDebt || 0;

          const updateCreditCardQuery = `
            UPDATE Card 
            SET debt = ?,
            currentBalance = limitDebit - ?
            WHERE id = ? AND type = 'debit'
          `;
          await db.runAsync(
            updateCreditCardQuery,
            totalDebt,
            totalDebt,
            expense.paymentMethod.id
          );
          await db.runAsync(updateQuery, ...values);
          const updatedExpense = await this.getExpenseById(id);

          if (!updatedExpense) {
            await db.closeAsync();
            throw new Error("Error updating Expense with id ${id}.");
          }
          await db.closeAsync();
          return updatedExpense!;
        }
        default:
          await db.closeAsync();
          throw new Error("PaymentMethod not allowed");
      }
    } catch (error) {
      throw new Error("Error updating expense: " + error);
    }
  }

  async deleteExpense(id: number): Promise<void> {
    const db = await getDataBase();
    try {
      const expense = await this.getExpenseById(id);
  
      if (!expense) {
        throw new Error(`Expense with id ${id} not found.`);
      }
  

      await db.runAsync("DELETE FROM Expense WHERE id = ?", id);
  
      if (expense.paymentMethod.type !== "cash" && 'id' in expense.paymentMethod) {
        
        if(expense.paymentMethod.type === "credit"){

  
          const updateCreditCardQuery = `
          UPDATE Card 
          SET debt = debt - ? 
          WHERE id = ? AND type = 'credit'
        `;
            await db.runAsync(
              updateCreditCardQuery,
              expense.amount,
              expense.paymentMethod.id
            );
  
        }
        if(expense.paymentMethod.type === "debit"){
          const updateCreditCardQuery = `
            UPDATE Card 
            SET debt = debt - ?,
            currentBalance = currentBalance + ?
            WHERE id = ? AND type = 'debit'
          `;
          await db.runAsync(
            updateCreditCardQuery,
            expense.amount,
            expense.amount,
            expense.paymentMethod.id
          );
        }
  

      }
    } catch (error) {
      throw new Error("Error deleting expense: " + error);
    } finally {
      await db.closeAsync();
    }
  }
  

  async getAllExpenses(): Promise<Expense[]> {
    const db = await getDataBase();
    try {
      const query = `
        SELECT 
          e.id,
          e.amount,
          e.concept,
          e.date,
          e.paymentMethod,
          e.cardId,
          c.id AS categoryId,
          c.type AS categoryType,
          c.color AS categoryColor,
          c.icon AS categoryIcon
        FROM Expense e
        JOIN Category c ON e.categoryId = c.id
      `;
      const allExpenses = await db.getAllAsync(query);

      return allExpenses.map((row: any) => ({
        id: row.id,
        amount: row.amount,
        concept: row.concept,
        date: new Date(row.date),
        paymentMethod: row.paymentMethod,
        cardId: row.cardId,
        category: {
          id: row.categoryId,
          type: row.categoryType,
          color: row.categoryColor,
          icon: row.categoryIcon,
        },
        type: "expense",
      }));
    } catch (error) {
      await db.closeAsync();
      throw new Error("Error getting all expenses: " + error);
    } finally {
      await db.closeAsync();
    }
  }

  async getExpensesByCategory?(category: Category): Promise<Expense[]> {
    const db = await getDataBase();
    try {
      const allExpense = await db.getAllAsync<Expense>(
        "SELECT * FROM Expense WHERE categoryId = ?",
        [category.id]
      );
      return allExpense;
    } catch (error) {
      throw new Error("Error getting expenses by category: " + error);
    } finally {
      await db.closeAsync();
    }
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
