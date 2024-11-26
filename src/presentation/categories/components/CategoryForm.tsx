import { Button, Input, Layout, Text } from "@ui-kitten/components";
import ColorPicker, { Panel1, HueSlider } from "reanimated-color-picker";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { CreateCategoryUseCase } from "@/src/application/use-cases/category/create-category.use-case";
import { CategoryRepositoryImpl } from "@/src/infrastructure";
import { router } from "expo-router";
import { useCategoryStore } from "../../store/categories/useCategoryStore";
import { Category } from "@/src/domain/entities/category.entity";
import { UpdateCategoryUseCase } from "@/src/application/use-cases/category/update-category.use-case";

interface Props {
  category: Category | null;
}

export const emojiRegex =
  /^[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E6}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{FE00}-\u{FE0F}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA70}-\u{1FAFF}]|[\u{1F000}-\u{1F02F}]$/u;

const categorySchema = z.object({
  icon: z
    .string()
    .min(1, "El ícono es obligatorio.")
    .regex(emojiRegex, "Debe ser un emoji válido."),
  name: z.string().min(1, "El nombre es obligatorio."),
  color: z.string().min(1, "Debes seleccionar un color."),
});

type CategoryFormData = z.infer<typeof categorySchema>;

export const CategoryForm = ({ category }: Props) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState(category?.color || "#fff");

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      icon: category?.icon || "",
      name: category?.type || "",
      color: category?.color || "#fff",
    },
  });

  const addCategoryToStore = useCategoryStore((state) => state.addCategory);
  const updateCategoryInStore = useCategoryStore(
    (state) => state.updateCategory
  );

  const onSelectColor = ({ hex }: any) => {
    setColor(hex);
    setValue("color", hex);
  };

  const onSubmit = async (data: CategoryFormData) => {
    const repository = new CategoryRepositoryImpl();

    if (category) {
      const updatedCategory = await new UpdateCategoryUseCase(
        repository
      ).execute(category.id, {
        color: data.color,
        icon: data.icon,
        type: data.name,
      });

      updateCategoryInStore(updatedCategory);
    } else {
      const newCategory = await new CreateCategoryUseCase(repository).execute({
        color: data.color,
        icon: data.icon,
        type: data.name,
      });
      addCategoryToStore(newCategory);
    }

    router.back();
  };

  return (
    <Layout
    style={{flex: 1}}
    >
      <Layout style={styles.container}>
        <Controller
          name="icon"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              size='large'
              label="Ícono de la categoría"
              placeholder="Ejemplo: 💦"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              status={errors.icon ? "danger" : "basic"}
            />
          )}
        />
        {errors.icon && (
          <Text style={styles.errorText}>{errors.icon.message}</Text>
        )}

        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              size='large'
              label="Nombre"
              placeholder="Ejemplo: Playa"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              status={errors.name ? "danger" : "basic"}
              style={styles.input}
            />
          )}
        />
        {errors.name && (
          <Text style={styles.errorText}>{errors.name.message}</Text>
        )}

        {/* Color Picker */}
        <Layout style={styles.colorRow}>
          <Button onPress={() => setShowColorPicker(true)}>
            Seleccionar color
          </Button>
          <Button
            appearance="ghost"
            style={[styles.colorPreview, { backgroundColor: color }]}
            onPress={() => setShowColorPicker(true)}
          />
        </Layout>
        {showColorPicker && (
          <Layout
            style={{
              margin: "auto",
              width: "90%",
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
              backgroundColor: "#151515",
              borderRadius: 50,
            }}
          >
            <ColorPicker
              style={{ width: "80%" }}
              value="#fff"
              onComplete={onSelectColor}
            >
              <Panel1 />
              <HueSlider />
            </ColorPicker>
            <Button
              style={{ marginTop: 10 }}
              onPress={() => setShowColorPicker(false)}
            >
              Ok
            </Button>
          </Layout>
        )}
        {/* Botón de acción */}
        <Button style={styles.createButton} onPress={handleSubmit(onSubmit)}>
          {category ? "Guardar Cambios" : "Crear"}
        </Button>
      </Layout>
    </Layout>
  );
};


const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      flex: 1,
      justifyContent: "flex-start",
    },
    input: {
      marginTop: 10,
    },
    colorRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 20,
      gap: 25,
    },
    colorPreview: {
      width: 50,
      height: 50,
      borderRadius: 5,
    },
    colorPickerContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    colorPanel: {
      width: "80%",
      height: 200,
    },
    hueSlider: {
      width: "80%",
      marginTop: 20,
    },
    okButton: {
      marginTop: 20,
    },
    createButton: {
      position: "absolute",
      bottom: 0,
      width: "120%",
      alignSelf: "center",
      marginBottom: 0,
      paddingVertical: 16,
    },
    errorText: {
      color: "red",
      fontSize: 12,
      marginTop: 5,
    },
  });
  