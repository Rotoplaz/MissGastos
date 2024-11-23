

import { Income } from '@/src/domain/entities/income.entity';
import { create } from 'zustand'


interface IncomeStoreState {
    incomes: Income[];
    setIncomes: (income: Income[]) => Income[];
    addIncome: (income:Income) => Income[];
}

const initialData = {
    incomes: []
}

export const useIncomeStore = create<IncomeStoreState>()((set,get)=>({
    ...initialData,
    setIncomes: (incomes: Income[]) => {
        set({incomes});
        return get().incomes;
    },
    addIncome: (income: Income) => {
        const incomesList = get().incomes;
        set({incomes: [...incomesList, income]});
        return get().incomes;
    }
}));