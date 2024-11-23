import { Avatar, Button, Icon, Layout, Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { TopNavigationHome } from "../../common/navigation/TopNavigationHome";
import { useUserStore } from "../../store/user/useUserStore";
import { StyleSheet } from "react-native";
import { router } from "expo-router";
import { GeneratePDFUseCase } from "@/src/application/use-cases/reports/generate-pdf.use-case";
import { getPDFLayout } from "../pdf-layout/get-PDF-layout";
import { ChartPieHome } from "../components/chart/ChartPieHome";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserMetricsService } from "@/src/domain/services/user-metrics.service";
import { Category } from "@/src/domain/entities/category.entity";
import { EmojiStatus } from "../components/EmojiStatus";
import { useGetCardsFromDatabase } from "../../cards/cardsScreen/hooks/useGetCardsFromDatabase";

export const HomeScreen = () => {
  useGetCardsFromDatabase();

  const [totalMoney] = useState(50000);
  const [money, setMoney] = useState(0);

  const user = useUserStore((state) => state.user);
  const [maxCategoryExpense, setMaxCategoryExpense] = useState<{
    amount: number;
    category: Category;
  } | null>(null);

  useEffect(() => {
    const getTotalMoney = () => {
      const metricsService = new UserMetricsService();
      const money = metricsService.totalAmountIncomes([]);
      setMoney(money);
    };
    getTotalMoney();
  }, []);

  useEffect(() => {
    const getMaxCategoryExpense = () => {
      const metricsService = new UserMetricsService();
      const category = metricsService.highAmountExpense([]);
      setMaxCategoryExpense(category);
    };
    getMaxCategoryExpense();
  }, []);



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1 }}>
        <TopNavigationHome />

        <Layout style={style.mainContainer}>
          <Text category="h1" style={style.welcomeText}>
            Hola {!user ? "" : user.name} bienvenido
          </Text>


          <EmojiStatus totalMoney={totalMoney}  />

          <Text style={style.totalMoney}>Dinero Total:</Text>
          <Text category="h2" style={style.money}>
            ${money}
          </Text>
          <Text style={style.subText}>
            Este es en lo que más gastas:{" "}
            {maxCategoryExpense ? maxCategoryExpense.category.type : "Nada"}
          </Text>

          <Layout style={{ width: "100%" }}>
            <ChartPieHome />
            <Layout style={{ width: "60%", marginTop: 20, paddingLeft: 35 }}>
              <Button
                size="large"
                onPress={() =>
                  new GeneratePDFUseCase().execute(getPDFLayout([], [], user!))
                }
                accessoryLeft={<Icon name="pie-chart-outline" />}
              >
                Generar Reporte
              </Button>
            </Layout>
          </Layout>

          {/* Floating button to add entry/exit */}
          <Button
            onPress={() => router.push("/createTransaction")}
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
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 10,
    alignItems: "center",
    paddingHorizontal: 10,
    width: "100%",
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
    color: "#229954",
    marginBottom: 5,
  },
  subText: {
    marginBottom: 20,
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
