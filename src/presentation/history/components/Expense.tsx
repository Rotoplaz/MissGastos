import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, ViewStyle } from "react-native";

interface ExpenseProps {
  expense: number;
  style?: ViewStyle;
}

export const Expense = ({ expense, style }: ExpenseProps) => {
  const isExpense = expense < 0;
  const amountColor = isExpense ? "red" : "green";

  return (
    <Layout style={[styles.expenseContainer, style]}>
      <Text
        style={[styles.expenseText, { color: amountColor }]}
        appearance="default"
      >
        {isExpense ? "Gasto" : "Ingreso"}: ${Math.abs(expense).toFixed(2)}
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  expenseContainer: {
    alignItems: "flex-end",
  },
  expenseText: {
    fontSize: 16,
  },
});
