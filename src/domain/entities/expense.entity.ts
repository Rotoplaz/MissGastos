import { Cash, CreditCard, DebitCard } from './payment-methods.entity';
import { Category } from './category.entity';

export interface Expense {
    id: number;
    amount: number;
    concept?: string;
    category: Category;
    paymentMethod: CreditCard | Cash | DebitCard;
    date: Date;
    type: "expense";
}
