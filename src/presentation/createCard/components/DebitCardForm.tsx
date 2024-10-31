import { Button, Input, Layout, Text } from "@ui-kitten/components";
import React from "react";
import { Alert, StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Definimos el esquema de validación con zod
const debitCardSchema = z.object({
  alias: z.string().min(1, "Alias es requerido"),
  lastFourDigits: z.string().length(4, "Debe tener 4 dígitos"),
  debt: z.coerce.number().min(0, "Debe ser un número válido"),
  limit: z.coerce.number().min(1, "Debe ser un número válido"),
  currentBalance: z.coerce.number().optional(),
});

interface FormData {
  alias: string;
  lastFourDigits: string;
  debt: string;
  limit: string;
  currentBalance?: string;
}

export const DebitCardForm = () => {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(debitCardSchema),
    defaultValues: {
      alias: "",
      lastFourDigits: "",
      debt: "",
      limit: "",
      currentBalance: "",
    },
  });

  const onSubmit = (data: FormData) => {
    Alert.alert("Éxito", "Formulario enviado correctamente.");
    // Resetea el formulario después de enviar los datos
    setValue("alias", "");
    setValue("lastFourDigits", "");
    setValue("debt", "");
    setValue("limit", "");
    setValue("currentBalance", "");
  };

  return (
    <>
      <Layout>
        <Text style={style.label}>Alias de la tarjeta</Text>
        <Input
          style={style.input}
          placeholder="Alias de la tarjeta"
          onChangeText={(text) => setValue("alias", text)}
          value={watch("alias")}
        />
        {errors.alias && <Text style={style.error}>{errors.alias.message}</Text>}
      </Layout>

      <Layout>
        <Text style={style.label}>Últimos 4 dígitos</Text>
        <Input
          style={style.input}
          placeholder="****"
          keyboardType="numeric"
          maxLength={4}
          onChangeText={(text) => setValue("lastFourDigits", text.replace(/[^0-9]/g, ""))}
          value={watch("lastFourDigits")}
        />
        {errors.lastFourDigits && (
          <Text style={style.error}>{errors.lastFourDigits.message}</Text>
        )}
      </Layout>

      <Layout>
        <Text style={style.label}>Deuda</Text>
        <Input
          style={style.input}
          placeholder="Cantidad"
          keyboardType="numeric"
          onChangeText={(text) => setValue("debt", text.replace(/[^0-9]/g, ""))}
          value={watch("debt")}
        />
        {errors.debt && <Text style={style.error}>{errors.debt.message}</Text>}
      </Layout>

      <Layout>
        <Text style={style.label}>Límite de gasto</Text>
        <Input
          style={style.input}
          placeholder="Solo números"
          keyboardType="numeric"
          onChangeText={(text) => setValue("limit", text.replace(/[^0-9]/g, ""))}
          value={watch("limit")}
        />
        {errors.limit && <Text style={style.error}>{errors.limit.message}</Text>}
      </Layout>

      <Layout>
        <Text style={style.label}>Saldo actual</Text>
        <Input
          style={style.input}
          placeholder="Solo números"
          keyboardType="numeric"
          onChangeText={(text) => setValue("currentBalance", text.replace(/[^0-9]/g, ""))}
          value={watch("currentBalance")}
        />
        {errors.currentBalance && (
          <Text style={style.error}>{errors.currentBalance.message}</Text>
        )}
      </Layout>

      <Layout style={{ alignSelf: "center" }}>
        <Button onPress={handleSubmit(onSubmit)}>
          Guardar
        </Button>
      </Layout>
    </>
  );
};

const style = StyleSheet.create({
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    marginBottom: 20,
    borderRadius: 8,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
  },
});
