import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Category as CategoryEntity } from "@/src/domain/entities/category.entity";
import { Expense } from "../components/Expense";
import { Category } from "../../categories/components/Category";
import { Expense as ExpenseEntity } from "@/src/domain/entities/expense.entity";
import { date } from "zod";
import { Income } from "../components/Income";
import { Income as IncomeEntity } from "@/src/domain/entities/income.entity";

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
    id: 2,
    amount: 20,
    concept: "Alimento",
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
    id: 5,
    amount: 100,
    concept: "Abono",
    date: new Date(),
  },
  {
    id: 5,
    amount: 702,
    concept: "Rifa",
    date: new Date(),
  },
];
export const HistoryScreen = () => {
  const { top } = useSafeAreaInsets();
  return (
    <Layout style={[styles.mainContainer, { paddingTop: top }]}>
      <ScrollView style={styles.scrollContainer}>
        {categories.map((expense) => (
          <Expense expense={expense} />
        ))}
        {categorie.map((income) => (
          <Income income={income} />
        ))}
      </ScrollView>
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
});
