import { Category } from "../entities/category.entity";
import { Expense } from "../entities/expense.entity";

export interface ExpenseRepository {
    getExpenseById(id: number): Promise<Expense | null>;
    createExpense(expense: Omit<Expense, "id">): Promise<Expense>;
    updateExpense(id: number, expense: Partial<Expense>): Promise<Expense>;
    deleteExpense(id: number): Promise<void>;
    getAllExpenses(): Promise<Expense[]>;
    getExpensesByCategory?(category: Category): Promise<Expense[]>;
    getExpensesGroupByCategory(): Promise<{type:string, totalExpense: number}[]>;
    getExpensesByDateRange(startDate: Date, endDate: Date): Promise<Expense[]>;
}