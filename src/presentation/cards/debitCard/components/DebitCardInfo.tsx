import { DebitCard } from "@/src/domain/entities/payment-methods.entity";
import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";

interface Props {
  debitCard: DebitCard;
}

export const DebitCardInformtaion = ({ debitCard }: Props) => {


  return (

      <Layout style={style.detailsContainer}>
        <Text style={style.detail}>Balance: {debitCard.currentBalance}{"\n"}</Text>
        <Text style={style.detail}>deuda: {debitCard.debt}{"\n"}</Text>
        <Text style={style.detail}>Limite de gasto: {debitCard.limitDebit}{"\n"}</Text>
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
