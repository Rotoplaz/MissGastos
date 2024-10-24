import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Layout,
  Text,
} from "@ui-kitten/components";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

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
      {/* <BottomNavigationTab
        title="Recordatorios"
        icon={(props) => <Icon {...props} name="calendar-outline" />}
      /> */}
      {/* <BottomNavigationTab
        title="Configuracion"
        icon={(props) => <Icon {...props} name="settings" />}
      /> */}
    </BottomNavigation>
  );
};

const style = StyleSheet.create({
  // bottomNav: {
  //     width: "100%",
  //     position: "absolute",
  //     bottom: 0,
  //     borderTopLeftRadius: 20,
  //     borderTopRightRadius: 20,
  //   },
});
