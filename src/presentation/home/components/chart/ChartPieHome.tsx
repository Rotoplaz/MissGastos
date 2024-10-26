import { GetExpensesGroupByCategoryUseCase } from "@/src/application/use-cases/expense/get-expense-group-by-category.use-case";
import { UserMetricsService } from "@/src/domain/services/user-metrics.service";
import { ExpenseSqliteRepositoryImpl } from "@/src/infrastructure/expense/expense-sqlite.repository.impl";
import { useUserStore } from "@/src/presentation/store/useUserStore";
import { Layout, Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { PieChart, pieDataItem } from "react-native-gifted-charts";

export const ChartPieHome = () => {
  const [data, setData] = useState<pieDataItem[]>([]);
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    const getCategories = async () => {
      const expenseRepository = new ExpenseSqliteRepositoryImpl();
      const serviceMetrics = new UserMetricsService();
      const expense = await new GetExpensesGroupByCategoryUseCase(
        expenseRepository
      ).execute();
      const metrics = serviceMetrics.getExpenseMetrics(expense);

      const data =
        metrics.totalExpensePercentages.length === 0
          ? [{ value: 100, color: "#717171", text: "Sin Gastos" }]
          : metrics.totalExpensePercentages.map((expense) => ({
              value: expense.porcentage,
              color: expense.color,
              text: expense.type,
            }));

      setData(data);
    };
    getCategories();
  }, []);

  return (
    <Layout style={style.chartContainer}>
      <PieChart data={data} radius={90} />
      <Layout style={{ alignSelf: "center" }}>
        {data.map((expense) => (
          <Layout
            key={expense.color}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Layout
              style={{ height: 10, width: 10, backgroundColor: expense.color }}
            />
            <Text>{expense.text}</Text>
          </Layout>
        ))}
      </Layout>
    </Layout>
  );
};

const style = StyleSheet.create({
  chartContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
  },
});
