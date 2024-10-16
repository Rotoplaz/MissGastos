import { ExpenseRepository } from "../repositories/expense.repository";
import { UserRepository } from "../repositories/user.repository";
import { CreditCardRepository } from "../repositories/credit-cards.repository";
import { DebitCardRepository } from "../repositories/debit-cards.repository";

interface AtributesOptions {
    expenseRepository:ExpenseRepository;
    userRepository:UserRepository;
    creditRepository:CreditCardRepository;
    debitRepository:DebitCardRepository;
}

export class UserMetricsService {
    constructor(
        private readonly atributesOptions:AtributesOptions
    ){}
    async getExpenseMetrics(){
        const allExpenseGroupByCategory = await this.atributesOptions.expenseRepository.getExpensesGroupByCategory();
        const totalSum = allExpenseGroupByCategory.reduce((acc, item) => acc + item.totalExpense, 0);
        const totalExpensePercentages = allExpenseGroupByCategory.map(item =>{
            return{
                type:item.type,
                porcentage: (item.totalExpense / totalSum) * 100
            };
        });

        return {
            allExpenseGroupByCategory, totalSum, totalExpensePercentages
        };
    }

    async isDebitCardLimitExede(id:number):Promise<boolean>{
        const debitCard = await this.atributesOptions.debitRepository.getDebitCardById(id);
        if (debitCard === null) throw new Error ("Card not found");

        if (debitCard.debt > debitCard.limit){
            return true;
        }
        return false;
    }

    async globalMetrics():Promise<number> {
        const user = await this.atributesOptions.userRepository.getUser()
        const allExpenseGroupByCategory = await this.atributesOptions.expenseRepository.getExpensesGroupByCategory();
        const totalSum = allExpenseGroupByCategory.reduce((acc, item) => acc + item.totalExpense, 0);
        
        if (user === null){
            throw new Error ("User not found");
        }
        const expensePorcentageLessThanlimit = (user.globalLimitBudget * 80) / 100 ;
        const expensePorcentageAbovelimit = (user.globalLimitBudget * 120) / 100 ;

        if (totalSum > expensePorcentageLessThanlimit && totalSum < expensePorcentageAbovelimit){
            return 1;
        }

        if ( totalSum > expensePorcentageAbovelimit){
            return 2;
        }
        return 0;
    }

}

