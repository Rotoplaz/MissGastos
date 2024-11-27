

import { Expense } from '@/src/domain/entities/expense.entity';
import { create } from 'zustand'


interface ExpenseStoreState {
    expense: Expense[];
    setExpense: (expense: Expense[]) => Expense[];
    addExpense: (expense:Expense) => Expense[];
    deleteExpense: (id:number)=>void;
    resetStoreExpense: () => void;
}

const initialData = {
    expense: []
}

export const useExpenseStore = create<ExpenseStoreState>()((set,get)=>({
    ...initialData,
    setExpense: (expense: Expense[]) => {
        set({expense});
        return get().expense;
    },
    addExpense: (expense: Expense) => {
        const expenseList = get().expense;
        set({expense: [...expenseList, expense]});
        return get().expense;
    },
    deleteExpense: (id: number) => {
        const expenseList = get().expense;
        set({expense: expenseList.filter(expense => expense.id !== id)});
        
    },
    resetStoreExpense: () =>{
        set({...initialData});
    }
}));