import { Button, Icon, Input, Layout } from "@ui-kitten/components";
import { Image, StyleSheet } from "react-native";
import { useUserStore } from "../store/useUserStore";
import { CreateUserUseCase } from "@/src/application/use-cases/user/create-suer.use-case";
import { UserRepositorySqliteImpl } from "@/src/infrastructure/user/user-sqli.repository.impl";
import { useRef, useState } from 'react';
import { router } from "expo-router";
import { LayoutWithTopNavigation } from "../layouts/LayoutWithTopNavigation";
import { UpdateUserUseCase } from "@/src/application/use-cases/user/update-user.user-case";
import { PickImageUseCase } from "@/src/application/use-cases/profilePicture/profile-picture.use-case";


export default function Profile() {
  const user = useUserStore(state=>state.user);
  const setUser = useUserStore(state=>state.setUser);
  const isNewUser = useRef(!user);
  const [form, setForm] = useState({
    globalLimitBudget: user?.globalLimitBudget?.toString() || "",
    name: user?.name || "",
  });
  
  console.log(isNewUser)
  
  const handleSaveUser = async () => {
    if(form.name === ''||form.globalLimitBudget=== '') {
      return;
    }
    const userRepository =new UserRepositorySqliteImpl();
    if (!user){
      const user = await new CreateUserUseCase(userRepository).execute({
        ...form,
        globalLimitBudget: Number(form.globalLimitBudget)
      });
      setUser(user);

    }

    try {
      const user = await new UpdateUserUseCase(userRepository).execute({
        name: form.name,
        globalLimitBudget: Number(form.globalLimitBudget),
      });
      setUser(user);
    } catch (error) {
      console.log(error)
    }
    if( isNewUser.current ){
      return router.replace("/(home)");
    }

    return;
  }

  const handlePickImage = async () => {

    if (!user){
      const userRepository =new UserRepositorySqliteImpl();
      const user = await new CreateUserUseCase(userRepository).execute({
        ...form,
        globalLimitBudget: Number(form.globalLimitBudget)
      });
      setUser(user);
    }

    const image = await new PickImageUseCase().execute();
    if(!image) {
      return;
    }
    const userRepository =new UserRepositorySqliteImpl();
    const userWithImage = await new UpdateUserUseCase(userRepository).execute({
      profilePictureUrl: image
    });
    
    setUser(userWithImage);
  }
  return (
    <LayoutWithTopNavigation TitleScreen="Perfil">

      <Layout style={style.mainContainer}>
        <Layout>
        <Image
            style={{ width: 200, height: 200, borderRadius: 100 }}
            source={
              user?.profilePictureUrl
                ? { uri: user.profilePictureUrl }
                : require("../assets/avatar.png")  
            }
          />
          <Button
            style={style.button}
            status="danger"
            accessoryLeft={<Icon name="camera-outline" />}
            onPress={handlePickImage}
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
    </LayoutWithTopNavigation>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    marginTop: 100
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
