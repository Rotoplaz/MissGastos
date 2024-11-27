import { Icon, Layout, Text, TopNavigationAction } from "@ui-kitten/components";
import { Income } from "../../domain/entities/income.entity";
import { LayoutWithTopNavigation } from "../common/layouts/LayoutWithTopNavigation";
import { Alert, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { IncomeSqliteRepositoryImpl } from "@/src/infrastructure";
import { GetIncomeByIdUseCase } from "@/src/application/use-cases/income/get-income-by-id.use-case";
import { FullLoaderScreen } from "../common/screens/loaders/FullLoaderScreen";
import { DeleteIncomeUseCase } from "@/src/application/use-cases/income/delete-income.use-case";
import { useIncomeStore } from "../store/income/useIncomeStore";

export const incomeInformation = () => {
  const params = useLocalSearchParams<{ id: string }>();
  const [income, setIncome] = useState<Income|null>(null);
  const deleteIncomeStore = useIncomeStore(state=>state.deleteIncome);

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
  
  const deleteIncome = async () => {
    Alert.alert("Cuidado", "¿Seguro de eliminar el ingreso?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Confirmar",
        style: "destructive",
        onPress: async () => {
          try {
            const repository = new IncomeSqliteRepositoryImpl();
            await new DeleteIncomeUseCase(repository).execute(income.id);
            deleteIncomeStore(income.id);
            router.back();
          } catch (error) {
            console.error("Error while deleting database:", error);
          }
        },
      },
    ]);

  }
  return (
    <LayoutWithTopNavigation titleScreen="Ingreso"  accessoryRight={() => (
      <TopNavigationAction
        onPress={deleteIncome}
        icon={<Icon name="trash-outline" fill="red" />}
      />
    )}>
      <Layout style={styles.container}>
        <Layout style={styles.card}>
          <Text category="h1" style={styles.amount}>
            ${income.amount.toFixed(2)}
          </Text>
          <Text category="s1" style={styles.concept}>
              Concepto: {income.concept!}
          </Text>
          <Layout style={styles.iconContainer}>
        <Icon name="trending-up-outline" fill="white" style={styles.icon} />
      </Layout>
          <Text appearance='hint' style={{marginVertical: 10, fontSize:25 }}>
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
    alignItems: "center",
    gap: 20
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
    fontSize: 50,
    marginBottom: 12,
    color: "#2C7D59",
  },
  concept: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 25,
    color: "#888",
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  iconContainer: {
    margin: "auto",
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dd9d24",
  },
});
