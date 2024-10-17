import { Avatar, Button, Icon, Input, Layout } from "@ui-kitten/components";
import { Size } from "@ui-kitten/components/devsupport";
import { StyleSheet } from "react-native";

export default function Profile() {
  return (
    <Layout style={style.mainContainer}>
      <Layout>
        <Avatar
          size="giant"
          style={{ width: 150, height: 150 }}
          source={require("../assets/avatar.png")}
        />
        <Button
          style={style.button}
          status="danger"
          accessoryLeft={<Icon name="camera-outline" />}
        />
      </Layout>

      <Input
        style={style.input}
        status="basic"
        placeholder="Escribe tu nombre"
      />
      <Button>Guardar</Button>
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
  input: {
    width: "80%",
    margin: 5,
  },
  button: {
    borderRadius: 200,
    width: 10,
    height: 10,
    position: "absolute",
    right: 5,
    bottom: 0,
  },
  avatarContainer: {
    position: "relative",
  },
});
