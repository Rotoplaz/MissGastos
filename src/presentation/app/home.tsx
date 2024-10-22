import React, { useState } from "react";
import { Button, Layout, Text, Icon, Avatar } from "@ui-kitten/components";
import { StyleSheet, View, TouchableOpacity } from "react-native";

export default function Home() {
  const [totalMoney] = useState(1005);

  const getAvatarSource = () => {
    if (totalMoney <= 5000) {
      return require("../presentation/assets/verylittlemoney.png");
    } else if (totalMoney >= 5001 && totalMoney <= 9999) {
      return require("../presentation/assets/littlemoney.png");
    } else if (totalMoney >= 10000 && totalMoney <= 20000) {
      return require("../presentation/assets/goodmoney.png");
    } else {
      return require("../presentation/assets/bigmoney.jpg");
    }
  };

  return (
    <Layout style={style.mainContainer}>
      <Text category="h1" style={style.welcomeText}>
        Hola bienvenido
      </Text>

      {/* Avatar according to the amount of money */}
      <Avatar
        size="giant"
        style={{ width: 150, height: 150, marginBottom: 20 }}
        source={getAvatarSource()}
      />

      {/* Total money */}
      <Text style={style.totalMoney}>Dinero Total:</Text>
      <Text category="h2" style={style.money}>
        ${totalMoney}
      </Text>
      <Text style={style.subText}>Este es en lo que más gastas: Comida</Text>

      {/* Graph */}

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

      {/* Bottom navigation bar */}
      <View style={style.bottomNav}>
        {/* Home Button */}
        <TouchableOpacity>
          <Icon name="home-outline" fill="white" style={style.navIcon} />
        </TouchableOpacity>

        {/* Cards Button */}
        <TouchableOpacity>
          <Icon name="credit-card-outline" fill="white" style={style.navIcon} />
        </TouchableOpacity>

        {/* Movements Button */}
        <TouchableOpacity>
          <Icon name="swap-outline" fill="white" style={style.navIcon} />
        </TouchableOpacity>

        {/* Reminders Button */}
        <TouchableOpacity>
          <Icon name="clock-outline" fill="white" style={style.navIcon} />
        </TouchableOpacity>
      </View>
    </Layout>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: -250,
  },
  welcomeText: {
    color: "white",
    marginBottom: 10,
  },
  money: {
    fontSize: 40,
    marginBottom: 5,
  },
  totalMoney: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: "bold",
    height: 30,
  },
  subText: {
    marginBottom: 20,
  },
  reportButton: {
    marginBottom: 20,
    right: 60,
    bottom: -190,
    backgroundColor: "#006666",
    borderRadius: 50,
    width: 140,
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
    flexDirection: "row",
    justifyContent: "space-around",
    width: "110%",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: "black",
    borderWidth: 1.5,
    paddingVertical: 10,
  },
  navIcon: {
    width: 30,
    height: 30,
  },
});
