import React, { useState } from "react";
import { LayoutWithTopNavigation } from "../../common/layouts/LayoutWithTopNavigation";
import {
  IndexPath,
  Layout,
  Select,
  SelectItem,
  Text,
} from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { DebitCardForm } from "../components/DebitCardForm";
import { CreditCardForm } from "../components/CreditCardForm";

export const CreateCardScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(
    new IndexPath(0)
  );
  const options = ["Crédito", "Débito"];

  return (
    <LayoutWithTopNavigation TitleScreen="Añadir Tarjeta">
      <Layout style={style.mainContainer}>
        <Layout style={style.container} level="1">
          <Layout style={style.rowContainer}>
            <Text style={style.text} category="h1">
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

          {options[selectedIndex.row] === "Débito" ? (
            <DebitCardForm />
          ) : (
            <CreditCardForm />
          )}
        </Layout>
      </Layout>
    </LayoutWithTopNavigation>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 10,
  },
  title: {
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
    marginTop: -10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  text: {
    fontSize: 15,
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
