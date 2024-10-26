import React, { useState } from "react";
import { Button, Layout, Text, Icon, Avatar } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { useUserStore } from "../../store/useUserStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TopNavigationHome } from "../../common/navigation/TopNavigationHome";
import { GeneratePDFUseCase } from "@/src/application/use-cases/reports/generate-pdf.use-case";
import { getPDFLayout } from "../../common/pdf-layout/get-PDF-layout";
import { router } from "expo-router";

const data = [
  { value: 70, color: "#f5b7b1" },
  { value: 90, color: "#aed6f1" },
  { value: 90, color: "#82e0aa" },
  { value: 30, color: "#d2b4de" },
];

export default function index() {
  const user = useUserStore((state) => state.user);
  const [totalMoney] = useState(50000);
  const { top } = useSafeAreaInsets();

  const getAvatarSource = () => {
    if (totalMoney <= 5000) {
      return require("../../assets/verylittlemoney.png");
    } else if (totalMoney >= 5001 && totalMoney <= 9999) {
      return require("../../assets/littlemoney.png");
    } else if (totalMoney >= 10000 && totalMoney <= 20000) {
      return require("../../assets/goodmoney.png");
    } else {
      return require("../../assets/bigmoney.jpg");
    }
  };

  return (
    <Layout style={{ flex: 1, paddingTop: top }}>
      <TopNavigationHome />

      <Layout style={style.mainContainer}>
        <Text category="h1" style={style.welcomeText}>
          Hola {!user ? "": user.name} bienvenido
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

        <Layout style={{ width: "100%" }}>
          <Layout style={style.chartContainer}>
            <PieChart data={data} radius={90} />
            <Layout style={{ alignSelf: "center" }}>
              <Text>Comida</Text>
              <Text>Educación</Text>
              <Text>Video Juegos</Text>
            </Layout>
          </Layout>
          <Layout style={{ width: "60%", marginTop: 20, paddingLeft: 35 }}>
            <Button
              size="large"
              onPress={() =>
                new GeneratePDFUseCase().execute(getPDFLayout([], [], user!))
              }
            >
              Generar Reporte
            </Button>
          </Layout>
        </Layout>

        {/* Floating button to add entry/exit */}
        <Button
          onPress={()=>router.push("/createTransaction")}
          style={style.fabButton}
          accessoryLeft={
            <Icon
              name="plus-outline"
              fill="white"
              style={{ width: 24, height: 24 }}
            />
          }
        ></Button>
      </Layout>
    </Layout>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 10,
    alignItems: "center",
    paddingHorizontal: 10,
    width: "100%",
    // backgroundColor: "red"
  },
  welcomeText: {
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
  fabButton: {
    position: "absolute",
    right: 15,
    bottom: 30,
    borderRadius: 50,
    padding: 20,
    height: 60,
  },

  chartContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
  },
});
