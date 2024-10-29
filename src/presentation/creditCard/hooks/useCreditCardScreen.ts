
import { useCreditCardsStore } from "../../store";
import { useEffect, useState } from "react";
import { CreditCard } from "@/src/domain/entities/payment-methods.entity";
import { Alert } from "react-native";
import { CreditCardCrudRepository } from "@/src/infrastructure";
import { DeleteCreditCardUseCase, GetCreditCardByIdUseCase } from "@/src/application";


export const useCreditCardScreen = (id: number) => {
    
    const deleteCreditCard = useCreditCardsStore(state=>state.deleteCreditCard);
    const [creditCard, setCreditCard] = useState<CreditCard | null>(null);
  
    useEffect(() => {
      const getCreditCard = async () => {
        const creditCardRepository = new CreditCardCrudRepository();
        const card = await new GetCreditCardByIdUseCase(
          creditCardRepository
        ).execute(id);
        setCreditCard(card);
      };
      getCreditCard();
    }, []);
  
    const confirmEdit = () => {
      Alert.alert(
        "Confirmar Edición",
        "¿Estás seguro de que quieres editar esta tarjeta?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Confirmar",
            //onPress: () => navigation.navigate("EditCard"), // Asegúrate de usar el nombre correcto de la pantalla
          },
        ]
      );
    };
  
    const confirmDelete = () =>{
      const creditCardRepository = new CreditCardCrudRepository();
      Alert.alert(
        "Confirmar Eliminación",
        "¿Estás seguro de que quieres eliminar esta tarjeta?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Confirmar",
            onPress: async() => {
              try {
                await new DeleteCreditCardUseCase(creditCardRepository).export(creditCard!.id);
                deleteCreditCard(creditCard!.id);
                
                
              } catch (error) {
                Alert.alert("Error eliminando tarjeta intende de nuevo");
              }
  
            },
          },
        ]
      )
    }
    
    return {
        confirmDelete,
        confirmEdit,
        creditCard
    }
}