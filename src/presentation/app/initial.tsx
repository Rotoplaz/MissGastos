import { Button, Layout } from "@ui-kitten/components";
import { Link } from "expo-router";
import { BackHandler, StyleSheet } from "react-native";

export default function InitialScreen() {
  return (
    <Layout style={style.mainContainer}>
      <Link href="/profile" replace asChild>
        <Button>Crear Perfil</Button>
      </Link>
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
});
