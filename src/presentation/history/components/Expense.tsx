import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, ViewStyle } from "react-native";

interface ExpenseProps {
  expense: number;
  style?: ViewStyle;
}

export const Expense = ({ expense, style }: ExpenseProps) => {
  return (
    <Layout style={[styles.expenseContainer, style]}>
      <Text style={styles.expenseText} appearance="default">
        Gasto: ${Math.abs(expense).toFixed(2)}
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
    color: "red",
  },
});
