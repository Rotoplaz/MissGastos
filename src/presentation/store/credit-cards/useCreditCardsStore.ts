import { CreditCard } from "@/src/domain/entities/payment-methods.entity";
import { create } from "zustand";



interface State {
    creditCards: CreditCard[];
    setCreditCards: (cards:CreditCard[]) => void;
    addCreditCard: (card: CreditCard) => CreditCard[];
    deleteCreditCard: (id: number) => void;
    updateCreditCard: (card: CreditCard) => CreditCard[];
}


export const useCreditCardsStore = create<State>()((set,get)=>({
    creditCards: [],
    setCreditCards: (cards:CreditCard[]) => {
        set({creditCards: cards})
    },
    addCreditCard: (card: CreditCard) => {
        set(state=>({creditCards: [...state.creditCards, card]}));

        return get().creditCards;
    },
    deleteCreditCard: (id: number) => {
        set(state=>({
            creditCards: state.creditCards.filter(card=> card.id !== id)
        }));
    },
    updateCreditCard: (card: CreditCard) => {
        const newCards = get().creditCards.map(creditCard => {
            if ( card.id === creditCard.id ) {
                return card;
            }
            return creditCard; 
        })

        set({ creditCards: newCards });
        return newCards; 
    }
}));