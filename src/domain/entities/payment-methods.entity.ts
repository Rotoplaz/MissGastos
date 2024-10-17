
export interface BaseCard {
    id: number;
    name: string;
    lastFourDigits: string;
    debt: number;
}

export interface CreditCard extends BaseCard {
    creditLimit: number;
    dueDate: Date;
    type: "credit";
}

export interface DebitCard extends BaseCard {
    currentBalance: number;
    limit: number;
    type: "debit";
}

export interface Cash {
    type: "cash";
}
