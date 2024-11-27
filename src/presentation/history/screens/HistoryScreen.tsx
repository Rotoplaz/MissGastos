import { Icon, Layout, Text } from "@ui-kitten/components";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Expense } from "../components/Expense";
import { CreateTransactionButton } from "../../atransactions/components/CreateTransactionButton";
import { useExpenseStore } from "../../store/expense/useExpenseStore";
import { useIncomeStore } from "../../store/income/useIncomeStore";
import { Expense as ExpenseEntity} from "@/src/domain/entities/expense.entity";
import { Income as IncomeEntity } from "@/src/domain/entities/income.entity";
import { Income } from "../components/Income";

export const HistoryScreen = () => {
  const { top } = useSafeAreaInsets();

  const expense = useExpenseStore((state) => state.expense);
  const incomes = useIncomeStore(state=>state.incomes);

  const transactions: Array<ExpenseEntity | IncomeEntity> = [
    ...expense,
    ...incomes
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).reverse();

  return (
    <Layout style={[styles.mainContainer, { paddingTop: top }]}>
      <Layout style={styles.scrollContainer}>
        {transactions.length === 0 ? (
          <Layout
            style={{
              flex: 1,
              marginTop: "70%",
              alignItems: "center",
              opacity: 0.2,
            }}
          >
            <Icon
              name="swap-outline"
              style={{ width: 150, height: 150 }}
              fill="#fff"
            />
            <Text category="h3">Agrega Movimientos</Text>
          </Layout>
        ) : (
          transactions.map((transaction, index) => (
            transaction.type === "income" ? (
              <Income key={`income-${index}`} income={transaction} />
            ) : (
              <Expense key={`expense-${index}`} expense={transaction} />
            )
          ))
        )}
      </Layout>
      <CreateTransactionButton />
    </Layout>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    marginVertical: 10,
  },
  itemTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 15,
  },
  expenseContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});
