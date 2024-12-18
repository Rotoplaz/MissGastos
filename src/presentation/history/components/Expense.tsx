import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { Category } from "../../categories/components/Category";
import { Expense as ExpenseEntity } from "@/src/domain/entities/expense.entity"
import { router } from "expo-router";
interface ExpenseProps {
  expense: ExpenseEntity;
  style?: ViewStyle;
}

export const Expense = ({ expense, style }: ExpenseProps) => {
  return (
    <TouchableOpacity
    style={styles.itemContainer}
    key={expense.id}
    onPress={()=>router.push({pathname: "/ExpenseInformation", params: {id:expense.id}})}
  >
    <Category
      category={expense.category}
      showTitle={false}
      onPress={()=>router.push({pathname: "/ExpenseInformation", params: {id:expense.id}})}
    />
    <Text style={styles.itemTitle}>{expense.concept ? expense.concept: expense.category.type}</Text>

    <Layout style={[styles.expenseContainer]}>
      <Text style={styles.expenseText} appearance="default">
        Gasto: ${Math.abs(expense.amount).toFixed(2)}
      </Text>
    </Layout>
  </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  expenseContainer: {
    alignItems: "flex-end",
    flex: 1,
  },
  expenseText: {
    fontSize: 16,
    color: "red",
  },
  itemContainer: {
    flexDirection: "row",
    marginVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  itemTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 15,
  },
})