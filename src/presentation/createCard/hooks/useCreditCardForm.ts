import { CreateCreditCardUseCase, UpdateCreditCardUserCase } from "@/src/application";
import { CreditCard } from "@/src/domain/entities/payment-methods.entity";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useCreditCardsStore } from "../../store";
import { useRef } from "react";
import { Alert } from "react-native";
import { CreditCardCrudRepositoryImpl } from "@/src/infrastructure";

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

    return{
        handleSubmit,
        setValue,
        watch,
        errors,
        onSubmit
    }
}