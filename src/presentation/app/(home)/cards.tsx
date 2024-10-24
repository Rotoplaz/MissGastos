import {
  Button,
  Icon,
  Layout,
  Divider,
  List,
  ListItem,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

interface IListItem {
  title: string;
  description: string;
}

export default function YourCards() {
  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={<Icon name="arrow-back" />} />
  );

  const handleAddCard = () => {
    //Agregar tarjeta
  };

  //Que funcione el boton de cada tarjeta
  const handleCardPress = (index: number) => {
    console.log(`Tarjeta ${index + 1} clicada`);
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: IListItem;
    index: number;
  }): React.ReactElement => (
    <TouchableOpacity onPress={() => handleCardPress(index)}>
      <ListItem
        title={`${item.title} ${index + 1}`}
        description={`${item.description} ${index + 1}`}
        accessoryLeft={<Icon name="credit-card-outline" />}
      />
    </TouchableOpacity>
  );

  const data = new Array(30).fill({
    title: "Tarjeta",
    card: "Numero de tarjeta",
  });

  return (
    <Layout style={style.mainContainer}>
      
      <Divider />
      <Button
        style={style.button}
        appearance="ghost"
        status="primary"
        size="large"
        accessoryLeft={<Icon name="plus-outline" />}
        //onPress={handleAddCard}
      >
        Crear tarjeta
      </Button>
      <List style={style.container} data={data} renderItem={renderItem} />
    </Layout>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  button: {
    width: "90%",
    margin: 10,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    marginLeft: "10%",
  },
  exit: {
    width: "5%",
    margin: 0,
    borderRadius: 200,
    position: "static",
    right: 8,
    bottom: 40,
  },
  container: {
    flex: 1,
    width: "100%",
  },
});
