import { DebitCard } from "@/src/domain/entities/payment-methods.entity";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useCardsStore } from "../../store";
import { CreateDebitCardUseCase } from "@/src/application";
import { DebitCardRepositoryImpl } from "@/src/infrastructure";
import { Alert } from "react-native";
import { router } from "expo-router";

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

export const useDebitCardForm = (debitCard: DebitCard | null) => {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(debitCardSchema),
    defaultValues: {
      name: debitCard?.name || "",
      lastFourDigits: debitCard?.lastFourDigits || "",
      debt: debitCard?.debt.toString() || "",
      limit: debitCard?.limit.toString() || "",
      currentBalance: debitCard?.currentBalance.toString() || "",
    },
  });
  const debitCardRepository = useRef(new DebitCardRepositoryImpl());
  const addCardInStore = useCardsStore((state) => state.addCard);
  const onSubmit = async (data: FormData) => {
    if (!debitCard) {
      const newCard = await new CreateDebitCardUseCase(
        debitCardRepository.current
      ).execute({
        currentBalance: +data.currentBalance,
        debt: +data.debt,
        lastFourDigits: data.lastFourDigits,
        limit: +data.limit,
        name: data.name,
        type: "debit",
      });
      addCardInStore(newCard);
      Alert.alert("Éxito", "Formulario enviado correctamente.");
      router.back();
    }
  };

  return {
    handleSubmit,
    setValue,
    watch,
    errors,
    onSubmit
  };
};
