import React from "react";
import { Button, Icon, Layout, Text } from "@ui-kitten/components";
import { StyleSheet, View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TopNavigationGeneric } from "../navigation/TopNavigationGeneric";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LayoutWithTopNavigation } from "../layouts/LayoutWithTopNavigation";

export default function WatchCard() {
  
  const {top} = useSafeAreaInsets()

  // Datos fijos simulados
  const cardData = {
    name: "NU",
    last4Digits: "5443",
    debt: 10000,
    creditLimit: 50000,
    cutOffDate: "10/10/2024",
  };

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

  return (
    <LayoutWithTopNavigation TitleScreen={cardData.name}>

      <Layout style={style.mainContainer}>
        

        <View style={style.cardContainer}>
          <View style={style.card}>
            <Text style={style.cardText}>
              **** **** **** {cardData.last4Digits}
            </Text>
          </View>

          <View style={style.detailsContainer}>
            <Text style={style.detail}>
              Nombre: {cardData.name} {"\n"}
            </Text>
            <Text style={style.detail}>
              Últimos 4 dígitos: {cardData.last4Digits} {"\n"}
            </Text>
            <Text style={style.detail}>
              Deuda: ${cardData.debt} {"\n"}
            </Text>
            <Text style={style.detail}>
              Límite de crédito: ${cardData.creditLimit} {"\n"}
            </Text>
            <Text style={style.detail}>
              Fecha de corte: {cardData.cutOffDate}
            </Text>
          </View>

          <View style={style.actionsContainer}>
            <Button
              style={style.exit}
              appearance="ghost"
              accessoryLeft={<Icon name="trash-2-outline" fill="white" />}
              onPress={() =>
                Alert.alert(
                  "Confirmar Eliminación",
                  "¿Estás seguro de que quieres eliminar esta tarjeta?",
                  [
                    { text: "Cancelar", style: "cancel" },
                    {
                      text: "Confirmar",
                      onPress: () => console.log("Tarjeta eliminada"),
                    },
                  ]
                )
              }
            />
            <Button
              style={style.exit}
              appearance="ghost"
              accessoryLeft={<Icon name="edit-outline" fill="white" />}
              onPress={confirmEdit}
            />
          </View>
        </View>
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
