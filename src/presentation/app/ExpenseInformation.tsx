import { router, useLocalSearchParams } from "expo-router";
import { LayoutWithTopNavigation } from "../common/layouts/LayoutWithTopNavigation";
import { Expense } from "../../domain/entities/expense.entity";
import { useEffect, useState } from "react";
import { ExpenseSqliteRepositoryImpl } from "@/src/infrastructure";
import { GetExpenseByIdUseCase } from "@/src/application/use-cases/expense/get-expense-by-id.use-case";
import {
  Layout,
  Text,
  Icon,
  TopNavigationAction,
} from "@ui-kitten/components";
import { Alert, StyleSheet, View } from "react-native";
import { Category } from "../categories/components/Category";
import { FullLoaderScreen } from "../common/screens/loaders/FullLoaderScreen";
import { DeleteExpenseUseCase } from "@/src/application/use-cases/expense/delete-expense.use-case";
import { useExpenseStore } from "../store/expense/useExpenseStore";

export const ExpenseInformation = () => {
  const params = useLocalSearchParams<{ id: string }>();
  const [expense, setExpense] = useState<Expense | null>(null);
  const [loading, setLoading] = useState(true);
  const deleteExpenseStore = useExpenseStore((state) => state.deleteExpense);
  useEffect(() => {
    const getExpense = async () => {
      try {
        const repository = new ExpenseSqliteRepositoryImpl();
        const expense = await new GetExpenseByIdUseCase(repository).execute(
          +params.id
        );
        setExpense(expense);
      } catch (error) {
        console.error("Error fetching expense:", error);
      } finally {
        setLoading(false);
      }
    };
    getExpense();
  }, []);

  const deleteExpense = (id: number) => {

    Alert.alert(
      "Cuidado",
      "¿Seguro de eliminar la categoria",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          style: "destructive",
          onPress: async () => {
            try {
              const repository = new ExpenseSqliteRepositoryImpl();
              await new DeleteExpenseUseCase(repository).execute(id);
              deleteExpenseStore(id);
              router.back();
            } catch (error) {
              console.error("Error while deleting database:", error);

            }
          },
        },
      ]
    );


  };

  if(!expense) return <FullLoaderScreen />

  return (
    <LayoutWithTopNavigation
      titleScreen="Detalles del Gasto"
      accessoryRight={() => (
        <TopNavigationAction
          onPress={()=>deleteExpense(expense.id)}
          icon={<Icon name="trash-outline" fill="red" />}
        />
      )}
    >
      <Layout style={styles.container}>
        {loading ? (
          <FullLoaderScreen />
        ) : expense ? (
          <Layout style={styles.card}>
            <Text category="h1" style={styles.amount}>
              ${expense.amount.toFixed(2)}
            </Text>
            {expense.concept && (
              <Text category="s1" style={styles.concept}>
                {expense.concept}
              </Text>
            )}
            <View style={styles.details}>
              <Text style={{ fontSize: 20 }}>Categoría:</Text>
              <Category category={expense.category} showTitle={false} />
            </View>
            <View style={styles.details}>
              <Text style={{ fontSize: 20 }}>Método de Pago:</Text>
              <Text style={{ fontSize: 20 }}>
                {expense.paymentMethod.type === "cash"
                  ? "Efectivo"
                  : expense.paymentMethod.name}
              </Text>
            </View>
            <View style={styles.details}>
              <Text style={{ fontSize: 20 }}>Fecha:</Text>
              <Text style={{ fontSize: 20 }}>
                {new Date(expense.date).toLocaleDateString()}
              </Text>
            </View>
          </Layout>
        ) : (
          <Text category="s1">No se encontró información del gasto.</Text>
        )}
      </Layout>
    </LayoutWithTopNavigation>
  );
};

export default ExpenseInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  card: {
    width: "100%",
    padding: 24,
    gap: 10,
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
    marginBottom: 24,
    fontSize: 25,
    color: "#888",
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    marginTop: 16,
    alignSelf: "center",
  },
});
