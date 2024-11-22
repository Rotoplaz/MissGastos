import { GetAllDebitCardsUseCase, GetAllCreditsCardsUseCase } from "@/src/application";
import { DebitCardRepositoryImpl, CreditCardCrudRepositoryImpl } from "@/src/infrastructure";
import { useCardsStore } from "@/src/presentation/store";
import { useEffect } from "react";



export const useGetCardsFromDatabase = () => {
    const setCardsStore = useCardsStore(state=> state.setCards);

  
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
}