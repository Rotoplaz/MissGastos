import { Icon, Layout, Text } from "@ui-kitten/components";
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
    getIncome();

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
              concepto: {income.concept!}
          </Text>
          <Layout style={styles.iconContainer}>
        <Icon name="trending-up-outline" fill="white" style={styles.icon} />
      </Layout>
          <Text appearance='hint' style={{marginVertical: 10}}>
            Fecha: {new Date(income.date).toLocaleDateString()}
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
    alignItems: "center"
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
    marginBottom: 10,
    fontSize: 18,
    color: "#888",
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  iconContainer: {
    width: 55,
    margin: "auto",
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dd9d24",
  },
});
