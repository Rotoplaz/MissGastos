import { useEffect, useState } from "react";
import { UserMetricsService } from "@/src/domain/services/user-metrics.service";
import { Category } from "@/src/domain/entities/category.entity";
import { ExpenseSqliteRepositoryImpl } from "@/src/infrastructure";
import { GetAllExpenseUseCase } from "@/src/application/use-cases/expense/get-all-expense.use-case";
import { useExpenseStore } from "../../store/expense/useExpenseStore";
import { useCategoryStore } from "../../store/categories/useCategoryStore";
import { useCardsStore } from "../../store";

export const useExpense = () => {
  const expense = useExpenseStore((state) => state.expense);
  const setExpense = useExpenseStore((state) => state.setExpense);
  const categories = useCategoryStore((state) => state.categories);
  const cards = useCardsStore((state) => state.cards);

  const [maxCategoryExpense, setMaxCategoryExpense] = useState<{
    amount: number;
    category: Category;
  } | null>(null);

  useEffect(() => {
    const calculateMaxCategoryExpense = () => {
      const metricsService = new UserMetricsService();
      const category = metricsService.highAmountExpense(expense);
      setMaxCategoryExpense(category);
    };

    calculateMaxCategoryExpense();
  }, [expense]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const expenseRepository = new ExpenseSqliteRepositoryImpl();
      const expenses = await new GetAllExpenseUseCase(expenseRepository).execute();

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const filteredExpenses = expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= thirtyDaysAgo;
      });

      setExpense(filteredExpenses);
    };

    fetchExpenses();
  }, [categories, cards]);

  // Return the state and computed values
  return { maxCategoryExpense, expense };
};
