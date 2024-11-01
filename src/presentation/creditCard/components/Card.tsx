import { CreditCard } from "@/src/domain/entities/payment-methods.entity";
import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";

interface Props {
  lastFourDigits: string;
}
  

export const Card = ({lastFourDigits}:Props) => {
  return (
    <Layout style={style.card}>
      <Text style={style.cardText}>
        **** **** **** {lastFourDigits}
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
