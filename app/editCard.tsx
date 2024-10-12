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

export default function EditCard() {
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(
    new IndexPath(0)
  );
  const [name, setName] = useState("NU");
  const [lastFourDigits, setLastFourDigits] = useState("5443");
  const [debt, setDebt] = useState("1234567890123456");
  const [creditLimit, setCreditLimit] = useState("50000");
  const [limit, setLimit] = useState("");
  const [cutOffDate, setCutOffDate] = useState("10");

  const options = ["Crédito", "Débito"];

  const handleSubmit = () => {
    Alert.alert("Éxito", "Tarjeta actualizada correctamente.");
  };

  const renderForm = () => {
    if (options[selectedIndex.row] === "Débito") {
      return (
        <Layout style={style.formContainer}>
          <Text style={style.label}>Nombre</Text>
          <Input
            style={style.input}
            value={name}
            onChangeText={(nextValue) => setName(nextValue)}
          />

          <Text style={style.label}>Últimos 4 dígitos</Text>
          <Input
            style={style.input}
            value={lastFourDigits}
            keyboardType="numeric"
            maxLength={4}
            onChangeText={(nextValue) =>
              setLastFourDigits(nextValue.replace(/[^0-9]/g, ""))
            }
          />

          <Text style={style.label}>Número</Text>
          <Input
            style={style.input}
            value={debt}
            keyboardType="numeric"
            maxLength={16}
            onChangeText={(nextValue) =>
              setDebt(nextValue.replace(/[^0-9]/g, ""))
            }
          />

          <Text style={style.label}>Límite</Text>
          <Input
            style={style.input}
            value={limit}
            keyboardType="numeric"
            onChangeText={(nextValue) =>
              setLimit(nextValue.replace(/[^0-9]/g, ""))
            }
          />

          <Text style={style.label}>Saldo actual</Text>
          <Input
            style={style.input}
            value={debt}
            keyboardType="numeric"
            onChangeText={(nextValue) =>
              setDebt(nextValue.replace(/[^0-9]/g, ""))
            }
          />
        </Layout>
      );
    } else if (options[selectedIndex.row] === "Crédito") {
      return (
        <Layout style={style.formContainer}>
          <Text style={style.label}>Nombre</Text>
          <Input
            style={style.input}
            value={name}
            onChangeText={(nextValue) => setName(nextValue)}
          />

          <Text style={style.label}>Últimos 4 dígitos</Text>
          <Input
            style={style.input}
            value={lastFourDigits}
            keyboardType="numeric"
            maxLength={4}
            onChangeText={(nextValue) =>
              setLastFourDigits(nextValue.replace(/[^0-9]/g, ""))
            }
          />

          <Text style={style.label}>Número</Text>
          <Input
            style={style.input}
            value={debt}
            keyboardType="numeric"
            maxLength={16}
            onChangeText={(nextValue) =>
              setDebt(nextValue.replace(/[^0-9]/g, ""))
            }
          />

          <Text style={style.label}>Límite de crédito</Text>
          <Input
            style={style.input}
            value={creditLimit}
            keyboardType="numeric"
            onChangeText={(nextValue) =>
              setCreditLimit(nextValue.replace(/[^0-9]/g, ""))
            }
          />

          <Text style={style.label}>Fecha de corte</Text>
          <Input
            style={style.input}
            value={cutOffDate}
            onChangeText={(nextValue) => setCutOffDate(nextValue)}
          />
        </Layout>
      );
    }
  };

  return (
    <Layout style={style.mainContainer}>
      <Layout style={style.headerContainer}>
        <Text style={style.title} category="H1">
          Editar Tarjeta
        </Text>
        <Button
          style={style.exitButton}
          appearance="ghost"
          accessoryLeft={<Icon name="arrow-back-outline" />}
        />
      </Layout>

      <Layout style={style.container}>
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

        {renderForm()}

        <Button
          style={style.submitButton}
          status="warning"
          onPress={handleSubmit}
        >
          Guardar
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
  headerContainer: {
    flexDirection: "row",
    right: -80,
    width: "90%",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
  },
  exitButton: {
    marginLeft: -250,
    marginVertical: 0,
    borderRadius: 300,
  },

  container: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
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
  text: {
    color: "white",
    fontSize: 20,
    marginBottom: 20,
    marginLeft: "10%",
  },
  select: {
    flex: 1,
    marginBottom: 20,
  },
});
