import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Category as CategoryEntity } from "@/src/domain/entities/category.entity";
import { Expense } from "../components/Expense";
import { Category } from "../../categories/components/Category";

// TODO: must be a ExpenseEntity
const categories: (CategoryEntity & { expense: number })[] = [
  {
    id: 5,
    type: "Casa",
    color: "#e67e22",
    icon: "home-outline",
    expense: -120.5,
  },
  {
    id: 8,
    type: "Trabajo",
    color: "#229954",
    icon: "briefcase-outline",
    expense: 250.75,
  },
  {
    id: 9,
    type: "Comida",
    color: "#d4ac0d",
    icon: "shopping-cart-outline",
    expense: -85.3,
  },
];

export const HistoryScreen = () => {
  const { top } = useSafeAreaInsets();

  return (
    <Layout style={[styles.mainContainer, { paddingTop: top }]}>
      <ScrollView style={styles.scrollContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            style={styles.itemContainer}
            key={category.id}
            onPress={() => console.log(`Clicked on ${category.type}`)}
          >
            <Category category={category} style={styles.iconContainer} showTitle={false} />
            <Text style={styles.itemTitle}>{category.type}</Text>

            <Expense
              expense={category.expense}
              style={styles.expenseContainer}
            />
          </TouchableOpacity>
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
  itemContainer: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    marginVertical: 10
  },
  itemTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 15,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  expenseContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});
