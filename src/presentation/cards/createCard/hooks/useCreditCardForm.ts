import {
  CreateCreditCardUseCase,
  UpdateCreditCardUserCase,
} from "@/src/application";
import { CreditCard } from "@/src/domain/entities/payment-methods.entity";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRef, useState } from "react";
import { Alert } from "react-native";
import { CreditCardCrudRepositoryImpl } from "@/src/infrastructure";
import { useCardsStore } from "@/src/presentation/store";

interface FormData {
  name: string;
  lastFourDigits: string;
  debt: string;
  creditLimit: string;
  dueDate: Date;
  color: string;
}

const creditCardSchema = z.object({
  name: z.string().min(1, "Nombre es requerido"),
  lastFourDigits: z.string().length(4, "Debe tener 4 dígitos"),
  debt: z.coerce.number().optional().default(0),
  creditLimit: z.coerce.number().min(1, "Debe ser un número válido"),
  dueDate: z.coerce.date(),
  color: z.string().min(1, "Debes seleccionar un color."),
});

export const useCreditCardForm = (creditCard: CreditCard | null) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState(creditCard?.color || "#fff");
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
      color: creditCard?.color || "#fff"
    },
  });
  const onSelectColor = ({ hex }: any) => {
    setColor(hex);
    setValue("color", hex);
  };
  const creditCardRepository = useRef(new CreditCardCrudRepositoryImpl());

  const addCardInStore = useCardsStore((state) => state.addCard);
  const updateCardInStore = useCardsStore((state) => state.updateCard);

  const onSubmit = async (data: FormData) => {
    if (!creditCard) {
      const newCard = await new CreateCreditCardUseCase(
        creditCardRepository.current
      ).execute({
        creditLimit: +data.creditLimit,
        debt: +data.debt,
        dueDate: new Date(data.dueDate),
        lastFourDigits: data.lastFourDigits,
        name: data.name,
        type: "credit",
        color: data.color,
      });
      addCardInStore(newCard);
      Alert.alert("Éxito", "Tarjeta agregada correctamente.");
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
      color: data.color,
    });

    updateCardInStore(creditCardUpdated);
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
    onSelectColor,
  };
};
