import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import { Button } from "@ui-kitten/components";

export default function GeneratePDF() {
  const html = `
    <html>
      <body>
        <h1> Hola, esto es un pdf SIUUU </h1>
      </body>
    </html>
  `;

  let generatePDF = async () => {
    const file = await printToFileAsync({
      html: html,
      base64: false,
    });

    await shareAsync(file.uri);
  };

  return (
    <View style={styles.container}>
      <Text>Esta es una aplicacion de prueba</Text>
      <Button onPress={generatePDF}>Generar PDF</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
