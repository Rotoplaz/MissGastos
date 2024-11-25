import { Income as IncomeEntity } from "@/src/domain/entities/income.entity";
import { Layout, Text, Icon } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

interface IncomeProps {
  income: IncomeEntity;
  style?: ViewStyle;
}

export const Income = ({ income }: IncomeProps) => {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      key={income.id}
      onPress={() => console.log(`Clicked on Income ${income.concept}`)}
    >
      <Layout style={styles.iconContainer}>
        <Icon name="trending-up-outline" fill="white" style={styles.icon} />
      </Layout>
      <Text style={styles.itemTitle}>{income.concept}</Text>

      <Layout style={[styles.expenseContainer]}>
        <Text style={styles.expenseText} appearance="default">
          Ingreso: ${income.amount.toFixed(2)}
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
    color: "green",
  },
  itemContainer: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    marginVertical: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dd9d24",
  },
  icon: {
    width: 28,
    height: 28,
    tintColor: "white",
  },
  itemTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 15,
  },
});
