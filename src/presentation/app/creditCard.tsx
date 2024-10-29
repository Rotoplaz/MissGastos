import React, { useEffect, useState } from "react";
import { Button, Icon, Layout, Text } from "@ui-kitten/components";
import { StyleSheet, View, Alert } from "react-native";
import { LayoutWithTopNavigation } from "../common/layouts/LayoutWithTopNavigation";
import { CreditCard } from "@/src/domain/entities/payment-methods.entity";
import { FullLoaderScreen } from "../common/screens/loaders/FullLoaderScreen";
import { GetCreditCardByIdUseCase } from "@/src/application/use-cases/creditCard/get-credit-card-by-id.user-cases";
import { CreditCardCrudRepository } from "@/src/infrastructure/cards/credit-card-crud.repository.impl";
import { CardInformation } from "../credit-card/components/CardInformation";
import { router, useLocalSearchParams } from "expo-router";
import { Card } from "../credit-card/components/Card";
import { DeleteCreditCardUseCase } from "@/src/application/use-cases/creditCard/delete-credit-card.user-case";
import { useCreditCardsStore } from "../store/credit-cards/useCreditCardsStore";

export default function CreditCardScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const deleteCreditCard = useCreditCardsStore(state=>state.deleteCreditCard);
  const [creditCard, setCreditCard] = useState<CreditCard | null>(null);

  useEffect(() => {
    const getCreditCard = async () => {
      const creditCardRepository = new CreditCardCrudRepository();
      const card = await new GetCreditCardByIdUseCase(
        creditCardRepository
      ).execute(+params.id);
      setCreditCard(card);
    };
    getCreditCard();
  }, []);

  const confirmEdit = () => {
    Alert.alert(
      "Confirmar Edición",
      "¿Estás seguro de que quieres editar esta tarjeta?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          //onPress: () => navigation.navigate("EditCard"), // Asegúrate de usar el nombre correcto de la pantalla
        },
      ]
    );
  };

  const confirmDelete = () =>{
    const creditCardRepository = new CreditCardCrudRepository();
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de que quieres eliminar esta tarjeta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          onPress: async() => {
            try {
              await new DeleteCreditCardUseCase(creditCardRepository).export(creditCard!.id);
              deleteCreditCard(creditCard!.id);
              router.back();
              
            } catch (error) {
              Alert.alert("Error eliminando tarjeta intende de nuevo");
            }

          },
        },
      ]
    )
  }
  

  if (!creditCard) {
    return <FullLoaderScreen />;
  }

  return (
    <LayoutWithTopNavigation TitleScreen={creditCard.name}>
      <Layout style={style.mainContainer}>
        <Layout style={style.cardContainer}>
          <Card creditCard={creditCard} />
          <CardInformation creditCard={creditCard} />
          <Layout style={style.actionsContainer}>
            <Button
              style={style.exit}
              appearance="ghost"
              accessoryLeft={<Icon name="trash-2-outline" fill="white" />}
              onPress={confirmDelete}
            />
            <Button
              style={style.exit}
              appearance="ghost"
              accessoryLeft={<Icon name="edit-outline" fill="white" />}
              onPress={confirmEdit}
            />
          </Layout>
        </Layout>
      </Layout>
    </LayoutWithTopNavigation>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: "10%",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
  },
  exit: {
    width: 50,
    height: 50,
  },
  cardContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  card: {
    backgroundColor: "#1A5FAD",
    borderRadius: 12,
    width: 300,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    fontSize: 25,
  },
  detailsContainer: {
    marginTop: 20,
    alignItems: "flex-start",
    width: 300,
  },
  detail: {
    fontSize: 17,
    marginBottom: 5,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 200,
    marginTop: 30,
  },
  iconButton: {
    height: 190,
    right: 80,
  },
});
