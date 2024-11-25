import { Layout, Text } from "@ui-kitten/components";
import { Income } from "../../domain/entities/income.entity";
import { LayoutWithTopNavigation } from "../common/layouts/LayoutWithTopNavigation";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { IncomeSqliteRepositoryImpl } from "@/src/infrastructure";
import { GetIncomeByIdUseCase } from "@/src/application/use-cases/income/get-income-by-id.use-case";
import { FullLoaderScreen } from "../common/screens/loaders/FullLoaderScreen";

export const incomeInformation = () => {
  const params = useLocalSearchParams<{ id: string }>();
  const [income, setIncome] = useState<Income|null>(null);
  useEffect(()=>{
    const getIncome = async() => {
      const repository = new IncomeSqliteRepositoryImpl();
      const income = await new GetIncomeByIdUseCase(repository).execute(+params.id);
      setIncome(income);
    }
  },[]);

  if(!income) {
    return <FullLoaderScreen />
  }

  return (
    <LayoutWithTopNavigation titleScreen="Ingreso">
      <Layout style={styles.container}>
        <Layout style={styles.card}>
          <Text category="h1" style={styles.amount}>
            ${income.amount.toFixed(2)}
          </Text>
          <Text category="s1" style={styles.concept}>
                {income.concept}
          </Text>
        </Layout>
      </Layout>
    </LayoutWithTopNavigation>
  );
};

export default incomeInformation;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 24,
  },
  container: {
    flex: 1,
    padding: 16,
    marginTop: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  amount: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 32,
    marginBottom: 12,
    color: "#2C7D59",
  },
  concept: {
    textAlign: "center",
    marginBottom: 24,
    fontSize: 18,
    color: "#888",
  },
});
