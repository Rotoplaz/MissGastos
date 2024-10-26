import { Button, Input, Layout, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { Alert, StyleSheet } from "react-native";

export const CreditCardForm = () => {

  const [name, setName] = useState("");
  const [lastFourDigits, setLastFourDigits] = useState("");
  const [debt, setDebt] = useState("");
  const [creditLimit, setCreditLimit] = useState("");
  const [dueDate, setDueDate] = useState("");

  const resetForm = () => {
    setName("");
    setLastFourDigits("");
    setDebt("");
    setCreditLimit("");
    setDueDate("");
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

    
    if (creditLimit.trim() === "" || dueDate.trim() === "") {
      Alert.alert(
        "Error",
        "Por favor, llene los campos de límite de crédito y fecha límite."
      );
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
        placeholder="****"
        keyboardType="numeric"
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
        keyboardType="numeric"
        placeholder="16 dígitos"
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

      <Text style={style.label}>Fecha límite</Text>
      <Input
        style={style.input}
        value={dueDate}
        placeholder="Día del mes (1-31)"
        keyboardType="numeric"
        maxLength={2}
        onChangeText={(nextValue) => {
          const numericValue = parseInt(nextValue.replace(/[^0-9]/g, ""), 10);

          if (numericValue >= 1 && numericValue <= 31) {
            setDueDate(nextValue);
          } else {
            setDueDate("");
          }
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
