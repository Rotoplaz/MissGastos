import { Income } from "../entities/income.entity";


export interface IncomeRepository {
    getIncomeById(id: number): Promise<Income | null>;
    createIncome(income: Omit<Income, "id">): Promise<Income>;
    updateIncome(id: number, expense: Partial<Income>): Promise<Income>;
    deleteIncome(id: number): Promise<void>;
    getAllIncome(): Promise<Income[]>;
    getIncomesByDateRange(startDate: Date, endDate: Date): Promise<Income[]>;
}