import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Button, Datepicker, Input, Layout, Text } from "@ui-kitten/components";
import { CreateCreditCardUseCase } from "@/src/application/use-cases/creditCard/create-credit-card.user-case";
import { CreditCardCrudRepositoryImpl } from "@/src/infrastructure/cards/credit-card-crud.repository.impl";
import { useCreditCardsStore } from "../../store/credit-cards/useCreditCardsStore";
import { router } from "expo-router";
import { CreditCard } from "@/src/domain/entities/payment-methods.entity";
import { UpdateCreditCardUserCase } from "@/src/application";

interface Props {
  creditCard: CreditCard | null;
}

interface FormData {
  name: string;
  lastFourDigits: string;
  debt: string;
  creditLimit: string;
  dueDate: Date;
}

const creditCardSchema = z.object({
  name: z.string().min(1, "Nombre es requerido"),
  lastFourDigits: z.string().length(4, "Debe tener 4 dígitos"),
  debt: z.coerce.number().min(0, "Debe ser un número válido"),
  creditLimit: z.coerce.number().min(1, "Debe ser un número válido"),
  dueDate: z.coerce.date(),
});

export const CreditCardForm = ({ creditCard }: Props) => {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(creditCardSchema),
    defaultValues: {
      name: creditCard?.name || "",
      lastFourDigits: creditCard?.lastFourDigits || "",
      debt: creditCard?.debt.toString() || "",
      creditLimit: creditCard?.creditLimit.toString() || "",
      dueDate: creditCard
        ? new Date(
            creditCard.dueDate.getTime() +
              creditCard.dueDate.getTimezoneOffset() * 60 * 1000
          )
        : new Date(),
    },
  });
  const creditCardRepository = useRef(new CreditCardCrudRepositoryImpl());

  const addCreditCard = useCreditCardsStore((state) => state.addCreditCard);
  const updateCreditCard = useCreditCardsStore(
    (state) => state.updateCreditCard
  );

  const onSubmit = async (data: FormData) => {
    if (!creditCard) {
      Alert.alert("Éxito", "Formulario enviado correctamente.");

      const newCard = await new CreateCreditCardUseCase(
        creditCardRepository.current
      ).execute({
        creditLimit: +data.creditLimit,
        debt: +data.debt,
        dueDate: new Date(data.dueDate),
        lastFourDigits: data.lastFourDigits,
        name: data.name,
        type: "credit",
      });
      addCreditCard(newCard);
      router.back();
      return;
    }

    const creditCardUpdated = await new UpdateCreditCardUserCase(
      creditCardRepository.current
    ).execute(creditCard.id, {
      creditLimit: +data.creditLimit,
      debt: +data.debt,
      dueDate: new Date(data.dueDate),
      lastFourDigits: data.lastFourDigits,
      name: data.name,
    });

    updateCreditCard(creditCardUpdated);
    router.back();
    return;
  };

  return (
    <>
      <Layout>
        <Text style={style.label}>Alias de la tarjeta</Text>
        <Input
          style={style.input}
          placeholder="Alias de la tarjeta"
          onChangeText={(text) => setValue("name", text)}
          value={watch("name")}
        />
        {errors.name && <Text style={style.error}>{errors.name.message}</Text>}
      </Layout>
      <Layout>
        <Text style={style.label}>Últimos 4 dígitos</Text>
        <Input
          style={style.input}
          placeholder="****"
          keyboardType="numeric"
          maxLength={4}
          onChangeText={(text) => setValue("lastFourDigits", text)}
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
          placeholder="Monto de deuda"
          keyboardType="numeric"
          onChangeText={(text) => setValue("debt", text)}
          value={watch("debt")}
        />
        {errors.debt && <Text style={style.error}>{errors.debt.message}</Text>}
      </Layout>

      <Layout>
        <Text style={style.label}>Límite de crédito</Text>
        <Input
          style={style.input}
          placeholder="Monto de crédito"
          keyboardType="numeric"
          onChangeText={(text) => setValue("creditLimit", text)}
          value={watch("creditLimit")}
        />
        {errors.creditLimit && (
          <Text style={style.error}>{errors.creditLimit.message}</Text>
        )}
      </Layout>

      <Layout>
        <Text style={style.label}>Fecha límite</Text>
        <Datepicker
          style={style.input}
          date={watch("dueDate")}
          onSelect={(nextDate) => setValue("dueDate", nextDate)}
        />

        {errors.dueDate && (
          <Text style={style.error}>{errors.dueDate.message}</Text>
        )}
      </Layout>

      <Layout style={{ alignSelf: "center" }}>
        <Button onPress={handleSubmit(onSubmit)}>Guardar</Button>
      </Layout>
    </>
  );
};

const style = StyleSheet.create({
  label: {
    fontSize: 18,
    marginBottom: 10,
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
