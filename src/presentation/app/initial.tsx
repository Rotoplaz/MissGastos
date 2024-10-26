import { Button, Layout } from "@ui-kitten/components";
import { Link, router } from "expo-router";
import { BackHandler, StyleSheet } from "react-native";

export default function InitialScreen() {
  return (
    <Layout style={style.mainContainer}>
      <Button onPress={()=>router.push("/profile")}>Crear Perfil</Button>
      <Button onPress={()=>BackHandler.exitApp()}>Salir</Button>
    </Layout>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  button: {
    margin: 4,
  },
});
