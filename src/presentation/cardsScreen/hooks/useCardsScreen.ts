import { useEffect, useState } from "react";
import { IListCardItem } from "../interfaces/IListCardItem";
import {
  CreditCardCrudRepositoryImpl,
  DebitCardRepositoryImpl,
} from "@/src/infrastructure";
import {
  GetAllCreditsCardsUseCase,
  GetAllDebitCardsUseCase,
} from "@/src/application";
import { useCardsStore } from "../../store/cards/useCardsStore";

export const useCardsScreens = () => {

  const setCardsStore = useCardsStore(state=> state.setCards);
  const cardsInStore = useCardsStore(state=> state.cards);
  const [cards, setCards] = useState<IListCardItem[]>([]);

  useEffect(() => {
    const getCards = async () => {
      const debitCardsRepository = new DebitCardRepositoryImpl();
      const creditCardsRepository = new CreditCardCrudRepositoryImpl();

      const debitCardsFromRepository = await new GetAllDebitCardsUseCase(
        debitCardsRepository
      ).execute();

      const creditCardsFromRepository = await new GetAllCreditsCardsUseCase(
        creditCardsRepository
      ).execute();
      setCardsStore([...debitCardsFromRepository,...creditCardsFromRepository]);
    };
    getCards();
  }, []);

  useEffect(() => {
    const cardsFormated = cardsInStore.map(
      ({ name, id, lastFourDigits }) => ({
        id,
        name,
        lastFourDigits,
      })
    );

    setCards([...cardsFormated]);
  }, [cardsInStore]);

  return {
    cards,
  };
};
