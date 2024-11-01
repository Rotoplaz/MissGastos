import { Button, Input, Layout, Text } from "@ui-kitten/components";
import React, { useRef } from "react";
import { Alert, StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DebitCard } from "@/src/domain/entities/payment-methods.entity";
import { DebitCardRepositoryImpl } from "@/src/infrastructure";
import { CreateDebitCardUseCase } from "@/src/application";
import { router } from "expo-router";
import { useCardsStore } from "../../store";


interface Props {
  debitCard: DebitCard | null;
}

const debitCardSchema = z.object({
  name: z.string().min(1, "Alias es requerido"),
  lastFourDigits: z.string().length(4, "Debe tener 4 dígitos"),
  debt: z.coerce.number().optional().default(0),
  limit: z.coerce.number().min(1, "Debe ser un número válido"),
  currentBalance: z.coerce.number().optional().default(0),
});

interface FormData {
  name: string;
  lastFourDigits: string;
  debt: string;
  limit: string;
  currentBalance: string;
}

export const DebitCardForm = ({ debitCard }:Props) => {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(debitCardSchema),
    defaultValues: {
      name: debitCard?.name || "",
      lastFourDigits:  debitCard?.lastFourDigits || "",
      debt: debitCard?.debt.toString() || "",
      limit: debitCard?.limit.toString() || "",
      currentBalance: debitCard?.currentBalance.toString() || "",
    },
  });
  const debitCardRepository = useRef(new DebitCardRepositoryImpl());
  const addCardInStore = useCardsStore(state=>state.addCard)
  const onSubmit = async (data: FormData) => {
    if(!debitCard) {
      const newCard = await new CreateDebitCardUseCase(debitCardRepository.current).execute({
        currentBalance: +data.currentBalance,
        debt: +data.debt,
        lastFourDigits: data.lastFourDigits,
        limit: +data.limit,
        name: data.name,
        type: "debit"
      });
      addCardInStore(newCard);
      Alert.alert("Éxito", "Formulario enviado correctamente.");
      router.back();
    }

  };

  return (
    <>
      <Layout style={style.inputContainer}>
        <Text style={style.label}>Alias de la tarjeta</Text>
        <Input
          placeholder="Alias de la tarjeta"
          onChangeText={(text) => setValue("name", text)}
          value={watch("name")}
        />
        {errors.name && <Text style={style.error}>{errors.name.message}</Text>}
      </Layout>

      <Layout style={style.inputContainer}>
        <Text style={style.label}>Últimos 4 dígitos</Text>
        <Input
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

      <Layout style={style.inputContainer}>
        <Text style={style.label}>Deuda</Text>
        <Input
          placeholder="Cantidad"
          keyboardType="numeric"
          onChangeText={(text) => setValue("debt", text.replace(/[^0-9]/g, ""))}
          value={watch("debt")}
        />
        {errors.debt && <Text style={style.error}>{errors.debt.message}</Text>}
      </Layout>

      <Layout style={style.inputContainer}>
        <Text style={style.label}>Límite de gasto</Text>
        <Input
          placeholder="Solo números"
          keyboardType="numeric"
          onChangeText={(text) => setValue("limit", text.replace(/[^0-9]/g, ""))}
          value={watch("limit")}
        />
        {errors.limit && <Text style={style.error}>{errors.limit.message}</Text>}
      </Layout>

      <Layout style={style.inputContainer}>
        <Text style={style.label}>Saldo actual</Text>
        <Input
          placeholder="Solo números"
          keyboardType="numeric"
          onChangeText={(text) => setValue("currentBalance", text.replace(/[^0-9]/g, ""))}
          value={watch("currentBalance")}
        />
        {errors.currentBalance && (
          <Text style={style.error}>{errors.currentBalance.message}</Text>
        )}
      </Layout>

      <Layout style={{ alignSelf: "center", marginTop: 20 }}>
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
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 20
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
  },
});
