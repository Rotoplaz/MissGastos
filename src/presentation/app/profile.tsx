import { Button, Icon, Input, Layout } from "@ui-kitten/components";
import { Image, StyleSheet, Text } from "react-native";
import { useUserStore } from "../store/user/useUserStore";
import { useRef, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { PickImageUseCase } from "@/src/application/use-cases/profilePicture/profile-picture.use-case";
import { UserRepositorySqliteImpl } from "@/src/infrastructure/user/user-sqli.repository.impl";
import { UpdateUserUseCase } from "@/src/application/use-cases/user/update-user.user-case";
import { CreateUserUseCase } from "@/src/application/use-cases/user/create-suer.use-case";
import { LayoutWithTopNavigation } from "../common/layouts/LayoutWithTopNavigation";

// Esquema de validación
const userSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .max(10, "Máximo 10 caracteres")
    .trim(),
  globalLimitBudget: z.string().regex(/^\d+$/, "Debe ser un número"),
});

type UserFormValues = z.infer<typeof userSchema>;

export default function Profile() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const userRepository = useRef(new UserRepositorySqliteImpl()).current;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name || "",
      globalLimitBudget: user?.globalLimitBudget?.toString() || "",
    },
  });

  const handleSaveUser = useCallback(
    async (data: UserFormValues) => {
      try {
        const userUpdated = user
          ? await new UpdateUserUseCase(userRepository).execute({
              name: data.name,
              globalLimitBudget: Number(data.globalLimitBudget),
            })
          : await new CreateUserUseCase(userRepository).execute({
              ...data,
              globalLimitBudget: Number(data.globalLimitBudget),
            });

        setUser(userUpdated);
        router.replace("/(home)");
      } catch (error) {
        console.error("Error al guardar el usuario:", error);
      }
    },
    [user, setUser, userRepository]
  );

  const handlePickImage = useCallback(async () => {
    try {
      const image = await new PickImageUseCase().execute();
      if (!image) return;

      const userWithImage = await new UpdateUserUseCase(userRepository).execute({
        profilePictureUrl: image,
      });
      setUser(userWithImage);
    } catch (error) {
      console.error("Error al actualizar la imagen de perfil:", error);
    }
  }, [user, setUser, userRepository]);

  return (
    <LayoutWithTopNavigation titleScreen="Perfil">
      <Layout style={styles.mainContainer}>
        {/* Avatar */}
        <Layout style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={
              user?.profilePictureUrl
                ? { uri: user.profilePictureUrl }
                : require("../assets/images/avatar.png")
            }
          />
          <Button
            style={styles.cameraButton}
            status="danger"
            accessoryLeft={<Icon name="camera-outline" />}
            onPress={handlePickImage}
          />
        </Layout>

        {/* Inputs */}
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              style={styles.input}
              status="basic"
              placeholder="Escribe tu nombre"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

        <Controller
          control={control}
          name="globalLimitBudget"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              style={styles.input}
              keyboardType="numeric"
              status="basic"
              placeholder="Límite de gastos"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
        />
        {errors.globalLimitBudget && (
          <Text style={styles.errorText}>{errors.globalLimitBudget.message}</Text>
        )}

        {/* Botón Guardar */}
        <Button style={styles.saveButton} onPress={handleSubmit(handleSaveUser)}>
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
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    marginLeft: "10%",
  },
  saveButton: {
    marginTop: 10,
  },
});
