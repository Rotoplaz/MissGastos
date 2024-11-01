import { DebitCard } from "@/src/domain/entities/payment-methods.entity";
import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";

interface Props {
  debitCard: DebitCard;
}

export const DebitCardInformtaion = ({ debitCard }: Props) => {


  return (
    <Layout>
      <Layout style={style.detailsContainer}>
        <Text style={style.detail}>Nombre: {debitCard.name}</Text>
        <Text style={style.detail}>Balance: {debitCard.currentBalance}</Text>
        <Text style={style.detail}>deuda: {debitCard.debt}</Text>
        <Text style={style.detail}>Limite de gasto: {debitCard.limitDebit}</Text>
      </Layout>
    </Layout>
  );
};

const style = StyleSheet.create({
  detailsContainer: {
    marginTop: 20,
    alignItems: "flex-start",
    width: 300,
  },
  detail: {
    fontSize: 17,
    marginBottom: 5,
  },
});
