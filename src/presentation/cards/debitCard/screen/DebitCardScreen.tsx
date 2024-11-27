import React, { useEffect, useRef, useState } from "react";
import { LayoutWithTopNavigation } from "../../../common/layouts/LayoutWithTopNavigation";
import { FullLoaderScreen } from "../../../common/screens/loaders/FullLoaderScreen";
import { router, useLocalSearchParams } from "expo-router";
import { Button, Icon, Layout, Text } from "@ui-kitten/components";
import { DebitCard } from "@/src/domain/entities/payment-methods.entity";
import { DeleteDebitCardUseCase, GetDebitCardByIdUseCase } from "@/src/application";
import { DebitCardRepositoryImpl } from "@/src/infrastructure";
import { DebitCardInformtaion } from "../components/DebitCardInfo";
import { Alert, ScrollView, StyleSheet } from "react-native";
import { useCardsStore } from "../../../store";
import { DebitCardForm } from "../../createCard/components/DebitCardForm";
import { Card } from "../../creditCard/components/Card";
import { usePreventScreenCapture } from "expo-screen-capture";

export const DebitCardScreen = () => {
  usePreventScreenCapture();
  const params = useLocalSearchParams<{ id: string }>();
  const [debitCard, setDebitCard] = useState<DebitCard | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const debitCardRepository = useRef(new DebitCardRepositoryImpl());
  const deleteCard = useCardsStore(state=>state.deleteCard);

  useEffect(() => {
    const getDebitCard = async () => {
      
      const card = await new GetDebitCardByIdUseCase(
        debitCardRepository.current
      ).execute(+params.id);
      setDebitCard(card);
    };
    getDebitCard();
  }, []);

  const handleDelete = async () => {
    
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de que quieres eliminar esta tarjeta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          onPress: async () => {
            try {
              await new DeleteDebitCardUseCase(debitCardRepository.current).execute(debitCard!.id);
              deleteCard(debitCard!.id);
              router.back();
            } catch (error) {
              Alert.alert("Error eliminando tarjeta intende de nuevo");
            }
          },
        },
      ]
    );
  }

  if (!debitCard) {
    return <FullLoaderScreen />;
  }
  return(
<LayoutWithTopNavigation titleScreen={debitCard.name}>
      <Layout style={style.mainContainer}>
        <Layout style={style.cardContainer}>
          {isEditing ? (
            <ScrollView>
              <Layout
                style={{
                  width: "100%",
                  flex: 1,
                  justifyContent: "flex-start",
                  paddingHorizontal: 10,
                  gap: 20,
                }}
              >
                <Button
                  appearance="ghost"
                  status="basic"
                  style={{ alignSelf: "flex-end" }}
                  onPress={() => setIsEditing(false)}
                >
                  Cancelar
                </Button>
                <DebitCardForm debitCard={debitCard} />
              </Layout>
            </ScrollView>
          ) : (
            <Layout style={{height: "80%",justifyContent: "center", alignItems: "center"}}>
              <Card lastFourDigits={debitCard.lastFourDigits} name={debitCard.name} />
              <DebitCardInformtaion debitCard={debitCard!} />
              <Layout style={style.actionsContainer}>
                <Button
                  size="large"
                  style={style.exit}
                  appearance="ghost"
                  accessoryLeft={<Icon name="trash-2-outline" fill="red" />}
                  onPress={handleDelete}
                />
                <Button
                  size="large"
                  style={style.exit}
                  appearance="ghost"
                  accessoryLeft={<Icon name="edit-outline" fill="white" />}
                  onPress={()=>setIsEditing(true)}
                />
              </Layout>
            </Layout>
          )}
        </Layout>
      </Layout>
    </LayoutWithTopNavigation>
  );
};


const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
  },
  exit: {
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical:30
  },
  cardContainer: {
    marginTop: 10,
    flex: 1,
    width: "100%",
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
  },
  iconButton: {
    height: 190,
    right: 80,
  },
});
