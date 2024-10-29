import { CreditCard } from "@/src/domain/entities/payment-methods.entity";
import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";

interface Props {
  creditCard: CreditCard;
}

export const CardInformation = ({ creditCard }: Props) => {
  return (
    <Layout>
      <Layout style={style.detailsContainer}>
        <Text style={style.detail}>
          Nombre: {creditCard.name} {"\n"}
        </Text>
        <Text style={style.detail}>
          Últimos 4 dígitos: {creditCard.lastFourDigits} {"\n"}
        </Text>
        <Text style={style.detail}>
          Deuda: ${creditCard.debt} {"\n"}
        </Text>
        <Text style={style.detail}>
          Límite de crédito: ${creditCard.creditLimit} {"\n"}
        </Text>
        <Text style={style.detail}>
          Fecha de corte: {creditCard.dueDate.toLocaleDateString("es-ES")}
        </Text>
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
