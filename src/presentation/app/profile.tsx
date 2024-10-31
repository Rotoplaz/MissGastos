import { Button, Icon, Input, Layout } from "@ui-kitten/components";
import { Image, StyleSheet } from "react-native";
import { useUserStore } from "../store/user/useUserStore";
import { useRef, useState, useCallback } from 'react';
import { router } from "expo-router";
import { PickImageUseCase } from "@/src/application/use-cases/profilePicture/profile-picture.use-case";
import { UserRepositorySqliteImpl } from "@/src/infrastructure/user/user-sqli.repository.impl";
import { UpdateUserUseCase } from "@/src/application/use-cases/user/update-user.user-case";
import { CreateUserUseCase } from "@/src/application/use-cases/user/create-suer.use-case";
import { LayoutWithTopNavigation } from "../common/layouts/LayoutWithTopNavigation";

export default function Profile() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const isNewUser = useRef(!user);
  const [form, setForm] = useState({
    globalLimitBudget: user?.globalLimitBudget?.toString() || "",
    name: user?.name || "",
  });

  const userRepository = useRef(new UserRepositorySqliteImpl()).current;

  const handleSaveUser = useCallback(async () => {
    if (form.name.trim() === "" || form.globalLimitBudget.trim() === "") return;

    try {
      const userUpdated = user
        ? await new UpdateUserUseCase(userRepository).execute({
            name: form.name,
            globalLimitBudget: Number(form.globalLimitBudget),
          })
        : await new CreateUserUseCase(userRepository).execute({
            ...form,
            globalLimitBudget: Number(form.globalLimitBudget),
          });
      
      setUser(userUpdated);
      
      router.replace("/(home)");
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
    }
  }, [form, user, setUser, userRepository]);

  const handlePickImage = useCallback(async () => {
    const newUser = !user
      ? await new CreateUserUseCase(userRepository).execute({
          ...form,
          globalLimitBudget: Number(form.globalLimitBudget),
        })
      : user;

    if (!user) setUser(newUser);

    const image = await new PickImageUseCase().execute();
    if (!image) return;

    try {
      const userWithImage = await new UpdateUserUseCase(userRepository).execute({
        profilePictureUrl: image,
      });
      setUser(userWithImage);
    } catch (error) {
      console.error("Error al actualizar la imagen de perfil:", error);
    }
  }, [user, form, setUser, userRepository]);

  return (
    <LayoutWithTopNavigation titleScreen="Perfil">
      <Layout style={styles.mainContainer}>
        <Layout style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={user?.profilePictureUrl ? { uri: user.profilePictureUrl } : require("../assets/avatar.png")}
          />
          <Button
            style={styles.cameraButton}
            status="danger"
            accessoryLeft={<Icon name="camera-outline" />}
            onPress={handlePickImage}
          />
        </Layout>
        
        <Input
          style={styles.input}
          status="basic"
          placeholder="Escribe tu nombre"
          value={form.name}
          onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
        />

        <Input
          style={styles.input}
          keyboardType="numeric"
          status="basic"
          placeholder="Limite de gastos"
          value={form.globalLimitBudget}
          onChangeText={(text) => setForm((prev) => ({ ...prev, globalLimitBudget: text }))}
        />

        <Button style={styles.saveButton} onPress={handleSaveUser}>
          Guardar
        </Button>
      </Layout>
    </LayoutWithTopNavigation>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    marginTop: 100,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  cameraButton: {
    borderRadius: 200,
    width: 10,
    height: 10,
    position: "absolute",
    right: 5,
    bottom: 0,
  },
  input: {
    width: "80%",
  },
  saveButton: {
    marginTop: 10,
  },
});
