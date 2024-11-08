import { useEffect, useState } from "react";
import { CreditCard } from "@/src/domain/entities/payment-methods.entity";
import { Alert } from "react-native";
import { CreditCardCrudRepositoryImpl } from "@/src/infrastructure";
import {
  DeleteCreditCardUseCase,
  GetCreditCardByIdUseCase,
} from "@/src/application";
import { useCardsStore } from "@/src/presentation/store";

export const useCreditCardScreen = (id: number) => {
  const [isEditing, setIsEditing] = useState(false);
  const deleteCardStore = useCardsStore((state) => state.deleteCard);
  const [creditCard, setCreditCard] = useState<CreditCard | null>(null);

  useEffect(() => {
    const getCreditCard = async () => {
      const creditCardRepository = new CreditCardCrudRepositoryImpl();
      const card = await new GetCreditCardByIdUseCase(
        creditCardRepository
      ).execute(id);
      setCreditCard(card);
    };
    getCreditCard();
  }, []);

  const confirmEdit = () => {
    setIsEditing(true);
  };

  const confirmDelete = () => {
    const creditCardRepository = new CreditCardCrudRepositoryImpl();
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de que quieres eliminar esta tarjeta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          onPress: async () => {
            try {
              await new DeleteCreditCardUseCase(creditCardRepository).execute(
                creditCard!.id
              );
              deleteCardStore(creditCard!.id);
            } catch (error) {
              Alert.alert("Error eliminando tarjeta intende de nuevo");
            }
          },
        },
      ]
    );
  };

  return {
    confirmDelete,
    confirmEdit,
    creditCard,
    isEditing,
    setIsEditing,
  };
};
