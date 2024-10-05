export interface BaseCard {
    id: number;
    name: string;
    lastFourDigits: string;
    debt: number;
}

export interface CreditCard extends BaseCard {
    creditLimit: number;
    dueDate: Date;
}

export interface DebitCard extends BaseCard {
    currentBalance: number;
    limit: number;
}
