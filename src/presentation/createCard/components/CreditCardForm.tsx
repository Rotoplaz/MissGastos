import { CreateCreditCardUseCase } from "@/src/application/use-cases/creditCard/create-credit-card.user-case";
import { CreditCardCrudRepository } from "@/src/infrastructure/cards/credit-card-crud.repository.impl";
import { Button, Calendar, Input, Layout, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { useCreditCardsStore } from "../../store/credit-cards/useCreditCardsStore";
import { router } from "expo-router";

export const CreditCardForm = () => {
  const [alias, setAlias] = useState("");
  const [lastFourDigits, setLastFourDigits] = useState("");
  const [debt, setDebt] = useState("");
  const [creditLimit, setCreditLimit] = useState("");
  const [dueDate, setDueDate] = useState("");
  const addCreditCard = useCreditCardsStore((state) => state.addCreditCard);

  const resetForm = () => {
    setAlias("");
    setLastFourDigits("");
    setDebt("");
    setCreditLimit("");
    setDueDate("");
  };

  const [date, setDate] = React.useState(new Date());

  // Función de validación de campos
  const validateForm = () => {
    if (
      alias.trim() === "" ||
      lastFourDigits.length !== 4 ||
      debt.trim() === ""
    ) {
      Alert.alert("Error", "Por favor, llene todos los campos correctamente.");
      return false;
    }

    return true;
  };
  const handleSubmit = async () => {
    if (validateForm()) {
      Alert.alert("Éxito", "Formulario enviado correctamente.");
      const repository = new CreditCardCrudRepository();
      const newCard = await new CreateCreditCardUseCase(repository).execute({
        creditLimit: Number(creditLimit),
        debt: Number(debt),
        dueDate: new Date("2029-10-10"),
        lastFourDigits,
        name: alias,
        type: "credit",
      });
      addCreditCard(newCard);
      router.back();
      resetForm();
    }
  };
  return (
    <Layout style={style.formContainer}>
      <Text style={style.label}>Nombre</Text>
      <Input
        style={style.input}
        placeholder="Alias de la tarjeta"
        value={alias}
        onChangeText={(nextValue) => setAlias(nextValue)}
      />

      <Text style={style.label}>Últimos 4 dígitos</Text>
      <Input
        style={style.input}
        value={lastFourDigits}
        placeholder="****"
        keyboardType="numeric"
        maxLength={4}
        onChangeText={(nextValue) => {
          const numericValue = nextValue.replace(/[^0-9]/g, "");
          setLastFourDigits(numericValue);
        }}
      />

      <Text style={style.label}>Deuda</Text>
      <Input
        style={style.input}
        value={debt}
        keyboardType="numeric"
        placeholder="Cantidad"
        maxLength={16}
        onChangeText={(nextValue) => {
          const numericValue = nextValue.replace(/[^0-9]/g, "");
          setDebt(numericValue);
        }}
      />

      <Text style={style.label}>Límite de crédito</Text>
      <Input
        style={style.input}
        value={creditLimit}
        placeholder="Solo números"
        keyboardType="numeric"
        onChangeText={(nextValue) => {
          const numericValue = nextValue.replace(/[^0-9]/g, "");
          setCreditLimit(numericValue);
        }}
      />

      <>
        <Text category="h7">Fecha límite: {date.toLocaleDateString()}</Text>
        <Calendar
          style={style.calendar}
          date={date}
          onSelect={(nextDate) => setDate(nextDate)}
        />
      </>

      <Button style={style.submitButton} status="danger" onPress={handleSubmit}>
        Enviar
      </Button>
    </Layout>
  );
};

const style = StyleSheet.create({
  formContainer: {
    marginTop: -20,
    padding: 6,
    backgroundColor: "transparent",
    borderRadius: 10,
    width: "100%",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    marginBottom: 20,
    borderRadius: 8,
  },
  submitButton: {
    marginTop: 0,
    width: "30%",
    marginLeft: "35%",
  },
  calendar: {
    marginVertical: 15,
    marginHorizontal: "5%",
    width: "90%",
  },
});
