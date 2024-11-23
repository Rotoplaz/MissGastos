import { UserMetricsService } from "@/src/domain/services/user-metrics.service";
import { useEffect, useState } from "react";
import { useExpenseStore } from "../../store/expense/useExpenseStore";
import { Category } from "@/src/domain/entities/category.entity";
import { ExpenseSqliteRepositoryImpl } from "@/src/infrastructure";
import { GetAllExpenseUseCase } from "@/src/application/use-cases/expense/get-all-expense.use-case";

export const useExpense = () => {
  const expense = useExpenseStore((state) => state.expense);
  const setExpense = useExpenseStore((state) => state.setExpense);

  const [maxCategoryExpense, setMaxCategoryExpense] = useState<{
    amount: number;
    category: Category;
  } | null>(null);

  useEffect(() => {
    const getMaxCategoryExpense = () => {
      const metricsService = new UserMetricsService();
      const category = metricsService.highAmountExpense(expense);
      setMaxCategoryExpense(category);
    };
    getMaxCategoryExpense();
  }, [expense]);

  useEffect(() => {
    const getExpense = async () => {
      const expenseRepository = new ExpenseSqliteRepositoryImpl();
      const expense = await new GetAllExpenseUseCase(
        expenseRepository
      ).execute();
      setExpense(expense);
    };
    getExpense();
  }, []);

  return {maxCategoryExpense, expense};
};
