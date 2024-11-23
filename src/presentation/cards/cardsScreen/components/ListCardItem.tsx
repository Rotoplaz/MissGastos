import { Icon, ListItem } from "@ui-kitten/components";
import React from "react";
import { IListCardItem } from '../interfaces/IListCardItem';
import { router } from "expo-router";

interface Props {
    item: IListCardItem;
}

export const ListCardItem = ({item}:Props) => {
    
  const handleCardPress = (item: IListCardItem) => {
    if(item.type === "credit") {
      return router.push({ pathname: "/creditCard", params: { id: item.id } });
    } 
    return router.push({ pathname: "/debitCard", params: { id: item.id } });
  };
  return (
    <ListItem
      title={`${item.name}`}
      description={`**** **** **** ${item.lastFourDigits}`}
      accessoryLeft={<Icon name="credit-card-outline" />}
      onPress={() => handleCardPress(item)}
      style={{borderRadius: 10}}
    />
  );
};
