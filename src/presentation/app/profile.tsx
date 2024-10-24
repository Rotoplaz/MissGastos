import { Avatar, Button, Icon, Input, Layout } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { useUserStore } from "../store/useUserStore";
import { CreateUserUseCase } from "@/src/application/use-cases/user/create-suer.use-case";
import { UserRepositorySqliteImpl } from "@/src/infrastructure/user/user-sqli.repository.impl";
import { useRef, useState } from 'react';
import { router } from "expo-router";


export default function Profile() {
  const user = useUserStore(state=>state.user);
  const setUser = useUserStore(state=>state.setUser);
   
  const [form, setForm] = useState({
    globalLimitBudget: user?.globalLimitBudget?.toString() || "",
    name: user?.name || "",
    profilePictureUrl: user?.profilePictureUrl || ""
  });

  const userRepository = useRef(new UserRepositorySqliteImpl());
 
  const handleSaveUser = async () => {
    if(form.name === ''||form.globalLimitBudget=== '') {
      return;
    }
    if (!user){
      const user = await new CreateUserUseCase(userRepository.current).execute({
        ...form,
        globalLimitBudget: Number(form.globalLimitBudget)
      });
      setUser(user);
      return router.replace("/(home)");
    }

  }
  return (
    <Layout style={style.mainContainer}>
      <Layout>
        <Avatar
          size="giant"
          style={{ width: 150, height: 150 }}
          source={user?.profilePictureUrl || require("../assets/avatar.png")}
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
        value={form.name}
        onChangeText={(text)=>{setForm({...form, name: text})}}
      />

      <Input
        style={style.input}
        keyboardType="numeric"
        status="basic"
        placeholder="Limite de gastos"
        value={form.globalLimitBudget}
        onChangeText={(text)=>setForm({...form,globalLimitBudget: text})}
      />

      <Button style={{marginTop: 10}} onPress={handleSaveUser}>Guardar</Button>
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
