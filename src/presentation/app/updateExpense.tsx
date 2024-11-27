import { Layout } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react'
import ExpenseForm from '../atransactions/forms/ExpenseForm';
import { useLocalSearchParams } from 'expo-router';
import { ExpenseSqliteRepositoryImpl } from '@/src/infrastructure';
import { GetExpenseByIdUseCase } from '@/src/application/use-cases/expense/get-expense-by-id.use-case';
import { Expense } from '@/src/domain/entities/expense.entity';
import { FullLoaderScreen } from '../common/screens/loaders/FullLoaderScreen';
import { LayoutWithTopNavigation } from '../common/layouts/LayoutWithTopNavigation';

export const updateExpense = () => {
    const params = useLocalSearchParams<{ id: string }>();
    const [expense, setExpense] = useState<Expense | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getExpense = async () => {
        try {
          const repository = new ExpenseSqliteRepositoryImpl();
          const expense = await new GetExpenseByIdUseCase(repository).execute(
            +params.id
          );
          setExpense(expense);
        } catch (error) {
          console.error("Error fetching expense:", error);
        } finally {
          setLoading(false);
        }
      };
      getExpense();
    }, []);

    if (loading) return <FullLoaderScreen />
  
  return (
    <LayoutWithTopNavigation titleScreen='Editar Gasto'>
        <ExpenseForm expense={expense} />
    </LayoutWithTopNavigation>
  )
}

export default updateExpense;