import React from "react";
import { StyleSheet } from "react-native";
import { Button, Icon, Layout, List } from "@ui-kitten/components";
import { ListCardItem } from "../components/ListCardItem";
import { useCardsScreens } from "../hooks/useCardsScreen";
import { router } from "expo-router";
import { useTheme } from "@react-navigation/native";

export const CardsScreens = () => {
  const { cards } = useCardsScreens();
  const handleAddCard = () => {
    router.push("/createCard");
  };
  const theme = useTheme();
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
};

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
