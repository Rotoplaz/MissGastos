import {
  Button,
  Icon,
  Layout,
  List,
  ListItem,
} from "@ui-kitten/components";
import { StyleSheet} from "react-native";
import React from "react";
import { router } from "expo-router";
import { useTheme } from "@react-navigation/native";

interface IListItem {
  title: string;
  lastFourDigits: string;
}

export default function YourCards() {
  const theme = useTheme();
  const handleAddCard = () => {
    //Agregar tarjeta
  };

  //Que funcione el boton de cada tarjeta
  const handleCardPress = (index: number) => {
    router.push("/watchCard");
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: IListItem;
    index: number;
  }): React.ReactElement => (
    
      <ListItem
        title={`${item.title} ${index + 1}`}
        description={`**** **** **** ${item.lastFourDigits}`}
        accessoryLeft={<Icon name="credit-card-outline" />}
        onPress={()=>handleCardPress(index)}
      />
    
  );

  const data = new Array(10).fill({
    title: "Tarjeta",
    card: "Numero de tarjeta",
    lastFourDigits: "3489"
  });

  return (
    <Layout style={style.mainContainer}>
      
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
      <List style={{backgroundColor: theme.colors.background}} data={data} renderItem={renderItem} />
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
});
