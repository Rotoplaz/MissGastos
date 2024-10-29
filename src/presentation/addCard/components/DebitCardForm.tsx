import { Button, Input, Layout, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { Alert, StyleSheet } from "react-native";

export const DebitCardForm = () => {

  const [name, setName] = useState("");
  const [lastFourDigits, setLastFourDigits] = useState("");
  const [debt, setDebt] = useState("");
  const [limit, setLimit] = useState("");
  const [currentbalance, setCurrentbalance] = useState("");

  const resetForm = () => {
    setName("");
    setLastFourDigits("");
    setDebt("");
    setLimit("");
    setCurrentbalance("");
  };

  // Función de validación de campos
  const validateForm = () => {
    if (
      name.trim() === "" ||
      lastFourDigits.length !== 4 ||
      debt.trim() === ""
    ) {
      Alert.alert("Error", "Por favor, llene todos los campos correctamente.");
      return false;
    }
    if (limit.trim() === "") {
      Alert.alert("Error", "Por favor, llene el campo de límite.");
      return false;
    }

    return true;
  };
  const handleSubmit = () => {
    if (validateForm()) {
      Alert.alert("Éxito", "Formulario enviado correctamente.");
      resetForm();
    }
  };

  return (
    <Layout style={style.formContainer}>
      <Text style={style.label}>Nombre</Text>
      <Input
        style={style.input}
        placeholder="Nombres y apellidos"
        value={name}
        onChangeText={(nextValue) => setName(nextValue)}
      />

      <Text style={style.label}>Últimos 4 dígitos</Text>
      <Input
        style={style.input}
        value={lastFourDigits}
        keyboardType="numeric"
        placeholder="****"
        maxLength={4}
        onChangeText={(nextValue) => {
          const numericValue = nextValue.replace(/[^0-9]/g, "");
          setLastFourDigits(numericValue);
        }}
      />

      <Text style={style.label}>Número</Text>
      <Input
        style={style.input}
        value={debt}
        placeholder="16 dígitos"
        keyboardType="numeric"
        maxLength={16}
        onChangeText={(nextValue) => {
          const numericValue = nextValue.replace(/[^0-9]/g, "");
          setDebt(numericValue);
        }}
      />

      <Text style={style.label}>Límite</Text>
      <Input
        style={style.input}
        value={limit}
        keyboardType="numeric"
        placeholder="Solo números"
        onChangeText={(nextValue) => {
          const numericValue = nextValue.replace(/[^0-9]/g, "");
          setLimit(numericValue);
        }}
      />

      <Text style={style.label}>Saldo actual</Text>
      <Input
        style={style.input}
        value={currentbalance}
        keyboardType="numeric"
        placeholder="Sólo números"
        onChangeText={(nextValue) => {
          const numericValue = nextValue.replace(/[^0-9]/g, "");
          setCurrentbalance(numericValue);
        }}
      />

      <Button style={style.submitButton} status="danger" onPress={handleSubmit}>
        Enviar
      </Button>
    </Layout>
  );
};

const style = StyleSheet.create({
  formContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "transparent",
    borderRadius: 10,
    width: "100%",
  },
  label: {
    color: "white",
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
});
