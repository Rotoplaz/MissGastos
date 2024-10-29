import { DebitCard } from "@/src/domain/entities/payment-methods.entity";
import { create } from "zustand";


interface State {
    debitCards: DebitCard[];
    setDebitCards: (cards:DebitCard[]) => void;
}


export const useDebitCardsStore = create<State>()((set,get)=>({
    debitCards: [],
    setDebitCards: (cards:DebitCard[]) => {
        set({debitCards: cards})
    }
}));