import React from "react";
import { StyleSheet } from "react-native";
import { Button, Icon, Layout, List, Text } from "@ui-kitten/components";
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

      {
        cards.length === 0 ? (
          <Layout style={{flex: 1, marginTop: "50%", alignItems: "center", opacity: 0.2}}>
            <Icon name="credit-card-outline" style={{width: 150, height: 150}} fill={theme.dark ? "#fff" : "#000"}  />
            <Text category='h3'>Agrega Tarjetas</Text>
          </Layout>
        ):(
          <Layout style={{paddingHorizontal: 10}}>
            <List
              style={{ backgroundColor: theme.colors.background }}
              data={cards}
              renderItem={({ item }) => <ListCardItem item={item} />}
            />
          </Layout>
        )
      }
    </Layout>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 50,
  },
  button: {
    width: "100%",
    paddingVertical: 20
  },
});
