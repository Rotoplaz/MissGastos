import { Button, Layout } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

export default function InitialScreen() {
  return (
    <Layout style={style.mainContainer}>
      <Button>Crear Perfil</Button>
      <Button>Salir</Button>
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
