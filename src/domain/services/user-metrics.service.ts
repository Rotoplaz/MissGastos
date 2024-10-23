import { DebitCard } from "../entities/payment-methods.entity";
import { User } from "../entities/user.entity";

export class UserMetricsService {
    
    getExpenseMetrics(expense:{
        type: string;
        totalExpense: number;
        }[]
    ){
        const totalSum = expense.reduce((acc, item) => acc + item.totalExpense, 0);
        const totalExpensePercentages = expense.map(item =>{
            return{
                type:item.type,
                porcentage: (item.totalExpense / totalSum) * 100
            };
        });

        return {
            expense, totalSum, totalExpensePercentages
        };
    }

    isDebitCardLimitExede(debitCard: DebitCard):boolean{
        if (debitCard.debt > debitCard.limit){
            return true;
        }
        return false;
    }

    globalMetrics(user: User, expense:{
        type: string;
        totalExpense: number;
        }[],
    ):number {
        const totalSum = expense.reduce((acc, item) => acc + item.totalExpense, 0);
        
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

