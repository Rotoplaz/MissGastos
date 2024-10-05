import { Income } from "../entities/income.entity";


export interface IncomeRepository {
    getIncomeByid(id: number): Promise<Income | null>;
    createIncome(income: Omit<Income, "id">): Promise<Income>;
    updateIncome(id: number, expense: Partial<Income>): Promise<Income>;
    deleteIncome(id: number): Promise<void>;
    getAllIncome(): Promise<Income[]>;
}