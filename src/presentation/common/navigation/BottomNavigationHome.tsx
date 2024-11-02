import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";
import React from "react";

export const BottomNavigationHome = ({ navigation, state }: any) => {
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab
        title="Inicio"
        icon={(props) => <Icon {...props} name="home-outline" />}
      />
      <BottomNavigationTab
        title="Tarjetas"
        icon={(props) => <Icon {...props} name="credit-card-outline" />}
      />
      <BottomNavigationTab
        title="Movimientos"
        icon={(props) => <Icon {...props} name="file-text-outline" />}
      />
      <BottomNavigationTab
        title="Categorías"
        icon={(props) => <Icon {...props} name="grid-outline" />}
      />

    </BottomNavigation>
  );
};
