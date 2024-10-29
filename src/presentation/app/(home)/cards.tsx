import { Button, Icon, Layout, List } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { useTheme } from "@react-navigation/native";
import { GetAllDebitCardsUseCase } from "@/src/application/use-cases/debitCard/get-all-debit-cards.use-case";
import { DebitCardRepositoryImpl } from "@/src/infrastructure/cards/debit-card-crud.repository.impl";
import { CreditCardCrudRepository } from "@/src/infrastructure/cards/credit-card-crud.repository.impl";
import { GetAllCreditsCardsUseCase } from "@/src/application/use-cases/creditCard/get-all-credit-cards.user-case";
import { useCreditCardsStore } from "../../store/credit-cards/useCreditCardsStore";
import { useDebitCardsStore } from "../../store/debit-cards/useDebitCardsStore";
import { IListCardItem } from "../../cards-screen/interfaces/IListCardItem";
import { ListCardItem } from "../../cards-screen/components/ListCardItem";


export default function YourCards() {
  const creditCards = useCreditCardsStore((state) => state.creditCards);
  const setCreditCards = useCreditCardsStore((state) => state.setCreditCards);
  const debitCards = useDebitCardsStore((state) => state.debitCards);
  const setDebitCards = useDebitCardsStore((state) => state.setDebitCards);

  const [cards, setCards] = useState<IListCardItem[]>([]);

  const theme = useTheme();

  const handleAddCard = () => {
    router.push("/createCard");
  };

  useEffect(() => {
    const getCards = async () => {
      const debitCardsRepository = new DebitCardRepositoryImpl();
      const creditCardsRepository = new CreditCardCrudRepository();

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
  

  return (
    <Layout style={style.mainContainer}>
      <Button
        style={style.button}
        appearance="ghost"
        status="primary"
        size="large"
        accessoryLeft={<Icon name="plus-outline" />}
        onPress={handleAddCard}
      >
        Crear tarjeta
      </Button>
      <List
        style={{ backgroundColor: theme.colors.background }}
        data={cards}
        renderItem={({ item }) => <ListCardItem item={item} />}
      />
    </Layout>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  button: {
    width: "90%",
    margin: 10,
  },

});
