import React from "react";
import { LayoutWithTopNavigation } from "../../common/layouts/LayoutWithTopNavigation";
import { Button, Icon, Layout } from "@ui-kitten/components";
import { Card } from "../components/Card";
import { CardInformation } from "../components/CardInformation";
import { router, useLocalSearchParams } from "expo-router";

import { ScrollView, StyleSheet } from "react-native";
import { FullLoaderScreen } from "../../common/screens/loaders/FullLoaderScreen";
import { useCreditCardScreen } from "../hooks/useCreditCardScreen";
import { CreditCardForm } from "../../createCard/components/CreditCardForm";

export const CreditCardScreen = () => {
  const params = useLocalSearchParams<{ id: string }>();
  const { confirmDelete, confirmEdit, creditCard, isEditing, setIsEditing } =
    useCreditCardScreen(+params.id);

  if (!creditCard) {
    return <FullLoaderScreen />;
  }

  const handleDelete = () => {
    confirmDelete();
    router.back();
  };

  return (
    <LayoutWithTopNavigation titleScreen={creditCard.name}>
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
                <CreditCardForm creditCard={creditCard} />
              </Layout>
            </ScrollView>
          ) : (
            <>
              <Card creditCard={creditCard} />
              <CardInformation creditCard={creditCard} />
              <Layout style={style.actionsContainer}>
                <Button
                  style={style.exit}
                  appearance="ghost"
                  accessoryLeft={<Icon name="trash-2-outline" fill="white" />}
                  onPress={handleDelete}
                />
                <Button
                  style={style.exit}
                  appearance="ghost"
                  accessoryLeft={<Icon name="edit-outline" fill="white" />}
                  onPress={confirmEdit}
                />
              </Layout>
            </>
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
    width: 50,
    height: 50,
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
    marginTop: 30,
  },
  iconButton: {
    height: 190,
    right: 80,
  },
});
