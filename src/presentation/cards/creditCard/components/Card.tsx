import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";

interface Props {
  lastFourDigits: string;
  name: string;
  color: string;
}

export const Card = ({ lastFourDigits, name, color }: Props) => {

  return (
    <Layout style={[style.card, {backgroundColor: color}]}>
      <Layout
        style={{
          backgroundColor: "transparent",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          paddingHorizontal: 30,
          alignItems: "flex-end"
        }}
      >
        <Layout style={style.chip} />
        <Text style={{fontSize: 30, fontWeight: "bold", color: "#fff"}}>{name}</Text>
      </Layout>
      <Text style={style.cardText}>**** **** **** {lastFourDigits}</Text>
    </Layout>
  );
};

const style = StyleSheet.create({
  card: {
    borderRadius: 12,
    width: 300,
    height: 180,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  cardText: {
    color: "white",
    fontSize: 25,
  },
  chip: {
    width: 50,
    height: 40,
    borderRadius: 5,
    backgroundColor: "#c1c1bc",
  },
});
