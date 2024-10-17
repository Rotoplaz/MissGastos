import { StyleSheet, Text, View } from "react-native";
import { Button } from "@ui-kitten/components";
import { generatePDF } from "../../../application/use-cases/reports/generate-pdf.use-case";
import { getPDFLayout } from "@/presentation/pdf-layout/get-PDF-layout";

export default function GeneratePDF() {
  return (
    <View style={styles.container}>
      <Text>Esta es una aplicacion de prueba</Text>
      <Button onPress={() => generatePDF(getPDFLayout())}>Generar PDF</Button>
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
