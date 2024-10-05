import { Cash, CreditCard, DebitCard } from './PaymentMethods';
import { Category } from './Category';

export interface Expense {
    id: number;
    amount: number;
    concept?: string;
    category: Category;
    paymentMethod: CreditCard | Cash | DebitCard;
}
