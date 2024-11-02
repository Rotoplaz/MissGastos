import { CreditCard, DebitCard } from "@/src/domain/entities/payment-methods.entity";
import { create } from "zustand";



interface State {
    cards: Array<CreditCard | DebitCard>;
    setCards: (cards: Array<CreditCard | DebitCard>) => void;
    addCard: (card: CreditCard | DebitCard) => Array<CreditCard | DebitCard>;
    deleteCard: (id: number) => void;
    updateCard: (card: CreditCard | DebitCard) => Array<CreditCard | DebitCard>;
    resetCardStore: ()=>void;
}

const initialData =  {
    cards: []
}

export const useCardsStore = create<State>()((set,get)=>({
    ...initialData,
    setCards: (cards: Array<CreditCard | DebitCard>) => {
        set({cards: cards})
    },
    addCard: (card: CreditCard | DebitCard) => {
        set(state=>({cards: [...state.cards, card]}));

        return get().cards;
    },
    deleteCard: (id: number) => {
        set(state=>({
            cards: state.cards.filter(card=> card.id !== id)
        }));
    },
    updateCard: (card: CreditCard | DebitCard) => {
        const newCards: Array<CreditCard | DebitCard> = get().cards.map((cardInStore: CreditCard | DebitCard) => {
            if ( cardInStore.id === card.id ) {
                return card;
            }
            return cardInStore; 
        })

        set({ cards: newCards });
        return newCards; 
    },
    resetCardStore: () => {
        set({...initialData});
    }
}));