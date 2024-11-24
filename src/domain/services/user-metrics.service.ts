import { Category } from "../entities/category.entity";
import { Expense } from "../entities/expense.entity";
import { Income } from "../entities/income.entity";
import { DebitCard } from "../entities/payment-methods.entity";
import { User } from "../entities/user.entity";

export class UserMetricsService {
    
    getExpenseMetrics(expense:{
        type: string;
        totalExpense: number;
        color: string;
        }[]
    ){
        const totalSum = expense.reduce((acc, item) => acc + item.totalExpense, 0);
        const totalExpensePercentages = expense.map(item =>{
            return{
                type:item.type,
                porcentage: (item.totalExpense / totalSum) * 100,
                color: item.color
            };
        });

        return {
            totalSum, totalExpensePercentages
        };
    }

    isDebitCardLimitExede(debitCard: DebitCard):boolean{
        if (debitCard.debt > debitCard.limitDebit){
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
    
    totalAmountIncomes(income:Income[], expense:Expense[]):number{
        const totalSum = income.reduce((acc, item) => acc + item.amount, 0);
        const totalSumExpense = expense.reduce((acc, item) => acc + item.amount, 0);
        const amountNow = totalSum - totalSumExpense;
        return amountNow;
        
    }

    highAmountExpense(expense:Expense[]):{amount:number,category:Category} | null{
        
        if(!expense || expense.length === 0) return null;
        const highExpense = expense.reduce((maxExpense, currentExpense) => 
        currentExpense.amount > maxExpense.amount ? currentExpense : maxExpense);
        return {amount: highExpense.amount, category: highExpense.category};

    }


}

