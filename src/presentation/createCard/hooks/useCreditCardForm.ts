import { CreateCreditCardUseCase, UpdateCreditCardUserCase } from "@/src/application";
import { CreditCard } from "@/src/domain/entities/payment-methods.entity";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRef } from "react";
import { Alert } from "react-native";
import { CreditCardCrudRepositoryImpl } from "@/src/infrastructure";
import { useCardsStore } from "../../store/cards/useCardsStore";

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
debt: z.coerce.number().optional().default(0),
creditLimit: z.coerce.number().min(1, "Debe ser un número válido"),
dueDate: z.coerce.date(),
});


export const useCreditCardForm = (creditCard: CreditCard | null) => {

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
    
      const addCardInStore = useCardsStore(state=>state.addCard);
      const updateCardInStore = useCardsStore(state=>state.updateCard);

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
          });
          addCardInStore(newCard);
          Alert.alert("Éxito", "Formulario enviado correctamente.");
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
    
        updateCardInStore(creditCardUpdated);
        router.back();
        return;
      };

    return{
        handleSubmit,
        setValue,
        watch,
        errors,
        onSubmit
    }
}