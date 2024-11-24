import React, { useEffect, useState } from "react";
import { Button, Icon, Layout, Text } from "@ui-kitten/components";
import { TopNavigationHome } from "../../common/navigation/TopNavigationHome";
import { useUserStore } from "../../store/user/useUserStore";
import { StyleSheet } from "react-native";
import { GeneratePDFUseCase } from "@/src/application/use-cases/reports/generate-pdf.use-case";
import { getPDFLayout } from "../pdf-layout/get-PDF-layout";
import { ChartPieHome } from "../components/chart/ChartPieHome";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserMetricsService } from "@/src/domain/services/user-metrics.service";
import { EmojiStatus } from "../components/EmojiStatus";
import { useGetCardsFromDatabase } from "../../cards/cardsScreen/hooks/useGetCardsFromDatabase";
import { useExpense } from "../../atransactions/hooks/useExpense";
import { CategoryRepositoryImpl, IncomeSqliteRepositoryImpl } from "@/src/infrastructure";
import { GetAllCategoriesUseCase } from "@/src/application/use-cases/category/get-all-categories.use-case";
import { useCategoryStore } from "../../store/categories/useCategoryStore";
import { useIncomeStore } from "../../store/income/useIncomeStore";
import { GetAllIncomeUseCase } from "@/src/application/use-cases/income/get-all-income.use-case";
import { CreateTransactionButton } from "../../atransactions/components/CreateTransactionButton";

export const HomeScreen = () => {
  useGetCardsFromDatabase();

  const [totalMoney] = useState(50000);
  const [money, setMoney] = useState(0);

  const user = useUserStore((state) => state.user);
  const { maxCategoryExpense, expense } = useExpense();
  const setCategories = useCategoryStore(state=>state.setCategories);
  const setIncomes = useIncomeStore(state=>state.setIncomes);
  const incomes = useIncomeStore(state=>state.incomes);
  useEffect(() => {
    const getIncomes = async () => {
      const incomeRepository = new IncomeSqliteRepositoryImpl();
      const incomes = await new GetAllIncomeUseCase(incomeRepository).execute();
      setIncomes(incomes);
    }
    getIncomes();
  }, [])
  

  useEffect(() => {
    const getTotalMoney = () => {
      const metricsService = new UserMetricsService();
      const money = metricsService.totalAmountIncomes(incomes, expense);
      setMoney(money);
    };
    getTotalMoney();
  }, [incomes,expense]);

      
  useEffect(() => {
    const getCategories = async () => {
      const categoriesRepository = new CategoryRepositoryImpl();
      const categories = await new GetAllCategoriesUseCase(
        categoriesRepository
      ).execute();
      setCategories(categories);
    };
    getCategories();
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
            {maxCategoryExpense ? maxCategoryExpense.category?.type : "Nada"}
          </Text>

          <Layout style={{ width: "100%",minHeight: 200 }}>
            <ChartPieHome />
            <Layout style={{ width: "60%", marginTop: 20, paddingLeft: 35 }}>
              <Button
                size="large"
                onPress={() =>
                  new GeneratePDFUseCase().execute(getPDFLayout(incomes, expense, user!))
                }
                accessoryLeft={<Icon name="pie-chart-outline" />}
              >
                Generar Reporte
              </Button>
            </Layout>
          </Layout>
          <CreateTransactionButton />
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

  chartContainer: {
    minHeight: 150,
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
  },
});
