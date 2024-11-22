import { useEffect, useState } from "react";
import { IListCardItem } from "../interfaces/IListCardItem";
import { useCardsStore } from "@/src/presentation/store";

export const useCardsScreens = () => {
  const cardsInStore = useCardsStore(state=> state.cards);
  const [cards, setCards] = useState<IListCardItem[]>([]);

  useEffect(() => {
    const cardsFormated = cardsInStore.map(
      ({ name, id, lastFourDigits, type }) => ({
        id,
        name,
        lastFourDigits,
        type
      })
    );
    setCards([...cardsFormated]);
  }, [cardsInStore]);

  return {
    cards,
  };
};
