import { StyleSheet, Text, View } from "react-native";
import { usePreventScreenCapture } from "expo-screen-capture";

export default function PreventSS() {
  usePreventScreenCapture();
  return (
    <View style={styles.container}>
      <Text>Esta es una aplicacion de prueba</Text>
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
