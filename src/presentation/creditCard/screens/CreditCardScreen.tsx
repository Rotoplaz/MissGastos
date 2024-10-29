import React from "react";
import { LayoutWithTopNavigation } from "../../common/layouts/LayoutWithTopNavigation";
import { Button, Icon, Layout } from "@ui-kitten/components";
import { Card } from "../components/Card";
import { CardInformation } from "../components/CardInformation";
import { router, useLocalSearchParams } from "expo-router";

import { StyleSheet } from "react-native";
import { FullLoaderScreen } from "../../common/screens/loaders/FullLoaderScreen";
import { useCreditCardScreen } from "../hooks/useCreditCardScreen";

export const CreditCardScreen = () => {
  const params = useLocalSearchParams<{ id: string }>();
  const { confirmDelete, confirmEdit, creditCard } = useCreditCardScreen(
    +params.id
  );

  if (!creditCard) {
    return <FullLoaderScreen />;
  }

  const handleDelete = () => {
    confirmDelete();
    router.back();
  };

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
              onPress={handleDelete}
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
};

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
