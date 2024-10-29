import { useEffect, useState } from "react";
import { useCreditCardsStore, useDebitCardsStore } from "../../store";
import { IListCardItem } from "../interfaces/IListCardItem";
import {
  CreditCardCrudRepositoryImpl,
  DebitCardRepositoryImpl,
} from "@/src/infrastructure";
import {
  GetAllCreditsCardsUseCase,
  GetAllDebitCardsUseCase,
} from "@/src/application";

export const useCardsScreens = () => {
  const creditCards = useCreditCardsStore((state) => state.creditCards);
  const setCreditCards = useCreditCardsStore((state) => state.setCreditCards);
  const debitCards = useDebitCardsStore((state) => state.debitCards);
  const setDebitCards = useDebitCardsStore((state) => state.setDebitCards);

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

      setDebitCards(debitCardsFromRepository);
      setCreditCards(creditCardsFromRepository);
    };
    getCards();
  }, []);

  useEffect(() => {
    const debitCardsFormated = debitCards.map(
      ({ name, id, lastFourDigits }) => ({
        id,
        name,
        lastFourDigits,
      })
    );
    const creditCardsFormated = creditCards.map(
      ({ name, id, lastFourDigits }) => ({
        id,
        name,
        lastFourDigits,
      })
    );
    setCards([...debitCardsFormated, ...creditCardsFormated]);
  }, [debitCards, creditCards]);

  return {
    cards,
  };
};
