import { Category } from "@/src/domain/entities/category.entity";
import { Expense } from "@/src/domain/entities/expense.entity";
import { ExpenseRepository } from "@/src/domain/repositories/expense.repository";


export class GetExpenseByCategoryUseCase {

    constructor(
        private readonly expenseRepository: ExpenseRepository
    ){}

    async execute(category: Category): Promise<Expense[]>{
        
        if ( this.expenseRepository.getExpensesByCategory === undefined){
            return [];
        }
            
        const expense = await this.expenseRepository.getExpensesByCategory(category)
        return expense;
    }

}