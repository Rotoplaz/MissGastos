import { CreditCard } from "@/src/domain/entities/payment-methods.entity";
import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";

interface Props {
    creditCard: CreditCard;
}
  

export const Card = ({creditCard}:Props) => {
  return (
    <Layout style={style.card}>
      <Text style={style.cardText}>
        **** **** **** {creditCard.lastFourDigits}
      </Text>
    </Layout>
  );
};

const style = StyleSheet.create({
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
});
