
export interface BaseCard {
    id: number;
    name: string;
    lastFourDigits: string;
    debt: number;
    color: string;
}

export interface CreditCard extends BaseCard {
    creditLimit: number;
    dueDate: Date;
    type: "credit";
}

export interface DebitCard extends BaseCard {
    currentBalance: number;
    limitDebit: number;
    type: "debit";
}

export interface Cash {
    type: "cash";
}
