import React, { useState } from "react";
import {
  Button,
  Layout,
  Text,
  Icon,
  Avatar,
  BottomNavigation,
  BottomNavigationTab,
} from "@ui-kitten/components";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { PieChart } from "react-native-gifted-charts";

const data = [
  { value: 70, color: "#f5b7b1" },
  { value: 90, color: "#aed6f1" },
  { value: 90, color: "#82e0aa" },
  { value: 30, color: "#d2b4de" },
];

export default function Home() {
  const [totalMoney] = useState(50000);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const getAvatarSource = () => {
    if (totalMoney <= 5000) {
      return require("../assets/verylittlemoney.png");
    } else if (totalMoney >= 5001 && totalMoney <= 9999) {
      return require("../assets/littlemoney.png");
    } else if (totalMoney >= 10000 && totalMoney <= 20000) {
      return require("../assets/goodmoney.png");
    } else {
      return require("../assets/bigmoney.jpg");
    }
  };

  return (
    <Layout style={style.mainContainer}>
      <Text category="h1" style={style.welcomeText}>
        Hola Leonel bienvenido
      </Text>

      <Avatar
        size="giant"
        style={{ width: 150, height: 150, marginBottom: 20 }}
        source={getAvatarSource()}
      />

      <Text style={style.totalMoney}>Dinero Total:</Text>
      <Text category="h2" style={style.money}>
        ${totalMoney}
      </Text>
      <Text style={style.subText}>Este es en lo que más gastas: Comida</Text>

      <Layout style={style.chartContainer}>
        <PieChart data={data} radius={70} />
      </Layout>

      {/* Button to generate report */}
      <Button style={style.reportButton}>Generar Reporte</Button>

      {/* Floating button to add entry/exit */}
      <TouchableOpacity style={style.fabButton}>
        <Icon
          name="plus-outline"
          fill="white"
          style={{ width: 24, height: 24 }}
        />
      </TouchableOpacity>

      <TouchableOpacity style={style.fabButton}>
        <Icon
          name="plus-outline"
          fill="white"
          style={{ width: 24, height: 24 }}
        />
      </TouchableOpacity>

      <Layout style={style.bottomNav}>
        <BottomNavigation
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
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
            title="Recordatorios"
            icon={(props) => <Icon {...props} name="calendar-outline" />}
          />
        </BottomNavigation>
      </Layout>
    </Layout>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  welcomeText: {
    color: "white",
    marginBottom: 10,
    fontSize: 30,
  },
  totalMoney: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: "bold",
  },
  money: {
    fontSize: 40,
    color: "#00e676",
    marginBottom: 5,
  },
  subText: {
    marginBottom: 20,
    color: "white",
  },
  reportButton: {
    marginBottom: 20,
    backgroundColor: "#006666",
    borderRadius: 50,
    width: 140,
    alignSelf: "center",
    borderWidth: 0,
    right: 60,
  },
  fabButton: {
    position: "absolute",
    right: 20,
    bottom: 100,
    backgroundColor: "#004C99",
    borderRadius: 50,
    padding: 15,
  },
  bottomNav: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  chartContainer: {
    width: 0,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 0,
    transform: [{ translateX: -60 }],
  },
});
