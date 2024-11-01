import { Button, Input, Layout, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";

import { DebitCard } from "@/src/domain/entities/payment-methods.entity";
import { useDebitCardForm } from "../hooks/useDebitCardForm";

interface Props {
  debitCard: DebitCard | null;
}

export const DebitCardForm = ({ debitCard }:Props) => {
  const { errors, handleSubmit, setValue, watch, onSubmit } = useDebitCardForm(debitCard);
  return (
    <>
      <Layout style={style.inputContainer}>
        <Text style={style.label}>Alias de la tarjeta</Text>
        <Input
          placeholder="Alias de la tarjeta"
          onChangeText={(text) => setValue("name", text)}
          value={watch("name")}
        />
        {errors.name && <Text style={style.error}>{errors.name.message}</Text>}
      </Layout>

      <Layout style={style.inputContainer}>
        <Text style={style.label}>Últimos 4 dígitos</Text>
        <Input
          placeholder="****"
          keyboardType="numeric"
          maxLength={4}
          onChangeText={(text) => setValue("lastFourDigits", text.replace(/[^0-9]/g, ""))}
          value={watch("lastFourDigits")}
        />
        {errors.lastFourDigits && (
          <Text style={style.error}>{errors.lastFourDigits.message}</Text>
        )}
      </Layout>

      <Layout style={style.inputContainer}>
        <Text style={style.label}>Deuda</Text>
        <Input
          placeholder="Cantidad"
          keyboardType="numeric"
          onChangeText={(text) => setValue("debt", text.replace(/[^0-9]/g, ""))}
          value={watch("debt")}
        />
        {errors.debt && <Text style={style.error}>{errors.debt.message}</Text>}
      </Layout>

      <Layout style={style.inputContainer}>
        <Text style={style.label}>Límite de gasto</Text>
        <Input
          placeholder="Solo números"
          keyboardType="numeric"
          onChangeText={(text) => setValue("limit", text.replace(/[^0-9]/g, ""))}
          value={watch("limit")}
        />
        {errors.limit && <Text style={style.error}>{errors.limit.message}</Text>}
      </Layout>

      <Layout style={style.inputContainer}>
        <Text style={style.label}>Saldo actual</Text>
        <Input
          placeholder="Solo números"
          keyboardType="numeric"
          onChangeText={(text) => setValue("currentBalance", text.replace(/[^0-9]/g, ""))}
          value={watch("currentBalance")}
        />
        {errors.currentBalance && (
          <Text style={style.error}>{errors.currentBalance.message}</Text>
        )}
      </Layout>

      <Layout style={{ alignSelf: "center", marginTop: 20 }}>
        <Button onPress={handleSubmit(onSubmit)}>
          Guardar
        </Button>
      </Layout>
    </>
  );
};

const style = StyleSheet.create({
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 20
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
  },
});
