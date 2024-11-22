import { Button, Input, Layout } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";

export const IncomeForm = () => {
  return (
    <Layout style={styles.mainContainer}>
      <Layout>
        <Input label="Cantidad del ingreso" placeholder="Cantidad" />
      </Layout>
      <Input label="Concepto" placeholder="Hasta 25 carácteres" />
      <Button style={styles.createButton}>Guardar</Button>
    </Layout>
  );
};


const styles = StyleSheet.create({
    iconBar: {
      width: 24,
      height: 24,
    },
    createButton: {
      position: "absolute",
      bottom: 0,
      width: "120%",
      alignSelf: "center",
      marginBottom: 0,
      paddingVertical: 16,
    },
  
    mainContainer: {
      flex: 1,
      paddingTop: 20,
      paddingHorizontal: 20,
    },
    errorText: {
      color: "red",
      fontSize: 12,
    },
  });
  