

import { Expense } from '@/src/domain/entities/expense.entity';
import { create } from 'zustand'


interface ExpenseStoreState {
    expense: Expense[];
    setExpense: (expense: Expense[]) => Expense[];
    addExpense: (expense:Expense) => Expense[];
    deleteExpense: (id:number)=>void;
    resetStoreExpense: () => void;
    updateExpense: (expense: Expense) => Expense[];
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
    },
    updateExpense: (expense: Expense) => {
        const expenseList = get().expense;
        set({expense: expenseList.map(expenseInStore=>{
            if(expense.id ===expenseInStore.id){
                return expense;
            }
            return expenseInStore;
        })})
        return get().expense;
    }
}));