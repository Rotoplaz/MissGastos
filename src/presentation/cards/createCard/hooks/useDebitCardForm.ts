import { DebitCard } from "@/src/domain/entities/payment-methods.entity";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { DebitCardRepositoryImpl } from "@/src/infrastructure";
import { Alert } from "react-native";
import { router } from "expo-router";
import { useCardsStore } from "@/src/presentation/store";
import {
  CreateDebitCardUseCase,
  UpdateDebitCardUseCase,
} from "@/src/application";

const debitCardSchema = z.object({
  name: z.string().min(1, "Alias es requerido"),
  lastFourDigits: z.string().length(4, "Debe tener 4 dígitos"),
  debt: z.coerce.number().optional().default(0),
  limit: z.coerce.number().min(1, "Debe ser un número válido"),
  currentBalance: z.coerce.number().optional().default(0),
  color: z.string().min(1, "Debes seleccionar un color."),
});

interface FormData {
  name: string;
  lastFourDigits: string;
  debt: string;
  limit: string;
  currentBalance: string;
  color: string;
}

export const useDebitCardForm = (debitCard: DebitCard | null) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState(debitCard?.color || "#fff");
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
      limit: debitCard?.limitDebit.toString() || "",
      currentBalance: debitCard?.currentBalance.toString() || "",
      color: debitCard?.color || "#fff",
    },
  });
  const onSelectColor = ({ hex }: any) => {
    setColor(hex);
    setValue("color", hex);
  };
  const debitCardRepository = useRef(new DebitCardRepositoryImpl());
  const addCardInStore = useCardsStore((state) => state.addCard);
  const updateCardStore = useCardsStore((state) => state.updateCard);

  const onSubmit = async (data: FormData) => {
    if (!debitCard) {
      const newCard = await new CreateDebitCardUseCase(
        debitCardRepository.current
      ).execute({
        currentBalance: +data.currentBalance,
        debt: +data.debt,
        lastFourDigits: data.lastFourDigits,
        limitDebit: +data.limit,
        name: data.name,
        type: "debit",
        color: data.color,
      });
      addCardInStore(newCard);
      Alert.alert("Éxito", "Tarjeta agregada correctamente.");
      router.back();
      return;
    }

    const newCard = await new UpdateDebitCardUseCase(
      debitCardRepository.current
    ).execute(debitCard!.id, {
      currentBalance: +data.currentBalance,
      debt: +data.debt,
      limitDebit: +data.limit,
      lastFourDigits: data.lastFourDigits,
      name: data.name,
      color: data.color,
    });

    updateCardStore(newCard);

    Alert.alert("Éxito", "Tarjeta actualizada correctamente.");
    router.back();
    return;
  };

  return {
    handleSubmit,
    setValue,
    watch,
    errors,
    onSubmit,
    showColorPicker,
    setShowColorPicker,
    color,
    setColor,
    onSelectColor,
  };
};
