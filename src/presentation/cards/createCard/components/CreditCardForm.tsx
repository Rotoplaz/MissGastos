import React from "react";
import { StyleSheet } from "react-native";
import { Button, Datepicker, Input, Layout, Text } from "@ui-kitten/components";
import { CreditCard } from "@/src/domain/entities/payment-methods.entity";
import { useCreditCardForm } from "../hooks/useCreditCardForm";

interface Props {
  creditCard: CreditCard | null;
}

export const CreditCardForm = ({ creditCard }: Props) => {

  const { errors, handleSubmit, setValue, watch, onSubmit } = useCreditCardForm(creditCard);

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
          onChangeText={(text) => setValue("lastFourDigits", text)}
          value={watch("lastFourDigits")}
        />
        {errors.lastFourDigits && (
          <Text style={style.error}>{errors.lastFourDigits.message}</Text>
        )}
      </Layout>

      <Layout style={style.inputContainer}>
        <Text style={style.label}>Deuda</Text>
        <Input
          placeholder="Monto de deuda"
          keyboardType="numeric"
          onChangeText={(text) => setValue("debt", text)}
          value={watch("debt")}
        />
        {errors.debt && <Text style={style.error}>{errors.debt.message}</Text>}
      </Layout>

      <Layout style={style.inputContainer}>
        <Text style={style.label}>Límite de crédito</Text>
        <Input
          placeholder="Monto de crédito"
          keyboardType="numeric"
          onChangeText={(text) => setValue("creditLimit", text)}
          value={watch("creditLimit")}
        />
        {errors.creditLimit && (
          <Text style={style.error}>{errors.creditLimit.message}</Text>
        )}
      </Layout>

      <Layout style={style.inputContainer}>
        <Text style={style.label}>Fecha límite</Text>
        <Datepicker
          date={watch("dueDate")}
          onSelect={(nextDate) => setValue("dueDate", nextDate)}
        />

        {errors.dueDate && (
          <Text style={style.error}>{errors.dueDate.message}</Text>
        )}
      </Layout>

      <Layout style={{ alignSelf: "center", marginTop: 20 }}>
        <Button onPress={handleSubmit(onSubmit)}>Guardar</Button>
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
