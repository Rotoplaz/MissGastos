import React, { useEffect, useState } from "react";
import { LayoutWithTopNavigation } from "../../common/layouts/LayoutWithTopNavigation";
import { FullLoaderScreen } from "../../common/screens/loaders/FullLoaderScreen";
import { useLocalSearchParams } from "expo-router";
import { Text } from "@ui-kitten/components";
import { DebitCard } from "@/src/domain/entities/payment-methods.entity";
import { GetDebitCardByIdUseCase } from "@/src/application";
import { DebitCardRepositoryImpl } from "@/src/infrastructure";

export const DebitCardScreen = () => {
  const params = useLocalSearchParams<{ id: string }>();
  const [debitCard, setDebitCard] = useState<DebitCard | null>(null);
  useEffect(() => {
    const getDebitCard = async () => {
      const debitCardRepository = new DebitCardRepositoryImpl();
      const card = await new GetDebitCardByIdUseCase(
        debitCardRepository
      ).execute(+params.id);
      setDebitCard(card);
    };
    getDebitCard();
  }, []);

  if (!debitCard) {
    return <FullLoaderScreen />;
  }
  return (
    <LayoutWithTopNavigation
      titleScreen={debitCard.name}
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <Text>Nombre: {debitCard.name}</Text>
      <Text>Balance: {debitCard.currentBalance}</Text>
      <Text>deuda: {debitCard.debt}</Text>
      <Text>Limite de gasto: {debitCard.limitDebit}</Text>
    </LayoutWithTopNavigation>
  );
};
