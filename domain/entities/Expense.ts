import { CreditCard, DebitCard } from './Card';
import { Category } from './Category';

export interface Expense {
    id: number;
    amount: number;
    concept?: string;
    category: Category;
    paymentMethod: CreditCard | DebitCard | "cash";
}

