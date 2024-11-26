import { CreditCard } from "@/src/domain/entities/payment-methods.entity";
import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";

interface Props {
  creditCard: CreditCard;
}

export const CardInformation = ({ creditCard }: Props) => {
  const dueDate = new Date(creditCard.dueDate);
  const date = new Date(
    dueDate.getTime() + dueDate.getTimezoneOffset() * 60 * 1000
  );

  return (
    <Layout style={style.detailsContainer}>
      <Text style={style.detail}>
        Deuda: ${creditCard.debt} {"\n"}
      </Text>
      <Text style={style.detail}>
        Límite de crédito: ${creditCard.creditLimit} {"\n"}
      </Text>
      <Text style={style.detail}>
        Fecha de corte: {date.toLocaleDateString("es-ES")}
      </Text>
    </Layout>
  );
};

const style = StyleSheet.create({
  detailsContainer: {
    marginTop: 20,
    alignItems: "flex-start",
    width: 300,
    marginBottom: 20
  },
  detail: {
    fontSize: 20,
    marginBottom: 5,
  },
});
