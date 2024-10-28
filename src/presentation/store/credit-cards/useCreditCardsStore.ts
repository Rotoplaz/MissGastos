import { CreditCard } from "@/src/domain/entities/payment-methods.entity";
import { create } from "zustand";



interface State {
    creditCards: CreditCard[];
    setCreditCards: (cards:CreditCard[]) => void;
    addCreditCard: (card: CreditCard) => CreditCard[];
}


export const useCreditCardsStore = create<State>()((set,get)=>({
    creditCards: [],
    setCreditCards: (cards:CreditCard[]) => {
        set({creditCards: cards})
    },
    addCreditCard: (card: CreditCard) => {
        set(state=>({creditCards: [...state.creditCards, card]}));

        return get().creditCards;
    }
}));