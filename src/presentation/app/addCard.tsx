import {
  Button,
  Icon,
  IndexPath,
  Layout,
  Select,
  SelectItem,
  Text,
  Input,
} from "@ui-kitten/components";
import React, { useState } from "react";
import { StyleSheet, Alert } from "react-native";

export default function AddCard() {
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(
    new IndexPath(0)
  );
  const [name, setName] = useState("");
  const [lastFourDigits, setLastFourDigits] = useState("");
  const [debt, setDebt] = useState("");
  const [limit, setLimit] = useState("");
  const [currentbalance, setCurrentbalance] = useState("");
  const [creditLimit, setCreditLimit] = useState("");
  const [dueDate, setDueDate] = useState("");

  const options = ["Crédito", "Débito"];

  // Función para reiniciar los campos del formulario
  const resetForm = () => {
    setName("");
    setLastFourDigits("");
    setDebt("");
    setLimit("");
    setCurrentbalance("");
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

    if (options[selectedIndex.row] === "Crédito") {
      if (creditLimit.trim() === "" || dueDate.trim() === "") {
        Alert.alert(
          "Error",
          "Por favor, llene los campos de límite de crédito y fecha límite."
        );
        return false;
      }
    }

    if (options[selectedIndex.row] === "Débito" && limit.trim() === "") {
      Alert.alert("Error", "Por favor, llene el campo de límite.");
      return false;
    }

    return true;
  };

  // Función para manejar el envío del formulario
  const handleSubmit = () => {
    if (validateForm()) {
      Alert.alert("Éxito", "Formulario enviado correctamente.");
      resetForm();
    }
  };

  // Renderiza dependiendo de la opción elegida
  const renderForm = () => {
    if (options[selectedIndex.row] === "Débito") {
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
        </Layout>
      );
    } else if (options[selectedIndex.row] === "Crédito") {
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
              const numericValue = parseInt(
                nextValue.replace(/[^0-9]/g, ""),
                10
              );

              if (numericValue >= 1 && numericValue <= 31) {
                setDueDate(nextValue);
              } else {
                setDueDate("");
              }
            }}
          />
        </Layout>
      );
    }
  };

  return (
    <Layout style={style.mainContainer}>
      <Layout>
        <Text style={style.title} category="H1">
          Tipo de tarjeta
        </Text>
        <Button
          style={style.exit}
          appearance="ghost"
          accessoryLeft={<Icon name="arrow-back-outline" />}
        />
      </Layout>
      <Layout style={style.container} level="1">
        <Layout style={style.rowContainer}>
          <Text style={style.text} category="H1">
            Tipo
          </Text>
          <Select
            selectedIndex={selectedIndex}
            value={options[selectedIndex.row]}
            onSelect={(index) => setSelectedIndex(index as IndexPath)}
            style={style.select}
          >
            {options.map((option, index) => (
              <SelectItem key={index} title={option} />
            ))}
          </Select>
        </Layout>

        {renderForm()}

        <Button
          style={style.submitButton}
          status="danger"
          onPress={handleSubmit}
        >
          Enviar
        </Button>
      </Layout>
    </Layout>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: "20%",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 30,
    right: 20,
  },
  exit: {
    width: 1,
    margin: 0,
    borderRadius: 300,
    position: "static",
    right: 70,
    top: "-11%",
  },
  container: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  text: {
    color: "white",
    fontSize: 20,
    marginBottom: 20,
    marginLeft: "10%",
  },
  select: {
    flex: 1,
    marginLeft: 130,
  },
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
