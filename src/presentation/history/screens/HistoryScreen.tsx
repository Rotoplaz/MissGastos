import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Expense } from "../components/Expense";
import { Category } from "../../categories/components/Category";
import { Expense as ExpenseEntity } from "@/src/domain/entities/expense.entity";
import { CreateTransactionButton } from "../../atransactions/components/CreateTransactionButton";
import { Income as IncomeEntity } from "@/src/domain/entities/income.entity";
import { Income } from "../components/Income";

const categories: ExpenseEntity[] = [
  {
    id: 5,
    amount: 70,
    concept: "Cafe",
    category: {
      id: 8,
      type: "Trabajo",
      color: "#229954",
      icon: "briefcase-outline",
    },
    date: new Date(),
    paymentMethod: {
      type: "cash",
    },
  },
  {
    id: 52,
    amount: 70,
    concept: "Cafe",
    category: {
      id: 4,
      type: "Alimento",
      color: "#3e84e9",
      icon: "shopping-cart-outline",
    },
    date: new Date(),
    paymentMethod: {
      type: "cash",
    },
  },
];

const categorie: IncomeEntity[] = [
  {
    id: 56,
    amount: 70,
    concept: "Rifa",
    date: new Date(),
  },
  {
    id: 97,
    amount: 765,
    concept: "Abono",
    date: new Date(),
  },
];
export const HistoryScreen = () => {
  const { top } = useSafeAreaInsets();
  return (
    <Layout style={[styles.mainContainer, { paddingTop: top }]}>
      <ScrollView style={styles.scrollContainer}>
        {categories.map((expense) => (
          <Expense key={expense.id} expense={expense} />
        ))}
        {categorie.map((income) => (
          <Income key={income.id} income={income} />
        ))}
      </ScrollView>
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
