import { StyleSheet, Text, View } from "react-native";
import { Button } from "@ui-kitten/components";
import { generatePDF } from "../../../application/use-cases/reports/generate-pdf.use-case";
import { getPDFLayout } from "../../pdf-layout/get-PDF-layout";
import { useEffect, useState } from "react";
import { IncomeSqliteRepositoryImpl } from "@/src/infrastructure/income/income-sqlite.repository.impl";
import { GetAllIncomeUseCase } from "@/src/application/use-cases/income/get-all-income.use-case";
import { Income } from "@/src/domain/entities/income.entity";
import { GetAllExpenseUseCase } from "@/src/application/use-cases/expense/get-all-expense.use-case";
import { ExpenseSqliteRepositoryImpl } from "@/src/infrastructure/expense/expense-sqlite.repository.impl";
import { Expense } from "@/src/domain/entities/expense.entity";
import { User } from "@/src/domain/entities/user.entity";
import { UserRepositorySqliteImpl } from "@/src/infrastructure/user/user-sqli.repository.impl";
import { GetUserUseCase } from "@/src/application/use-cases/user/get-user.use-case";

export default function GeneratePDF() {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const incomeRepository = new IncomeSqliteRepositoryImpl();
    const getAllIncome = new GetAllIncomeUseCase(incomeRepository);

    getAllIncome.execute().then((data) => {
      setIncomes(data);
    });
  }, []);

  useEffect(() => {
    const expenseRepository = new ExpenseSqliteRepositoryImpl();
    const getAllExpense = new GetAllExpenseUseCase(expenseRepository);

    getAllExpense.execute().then((data) => {
      setExpenses(data);
    });
  });

  useEffect(() => {
    const userRepository = new UserRepositorySqliteImpl();
    const getUser = new GetUserUseCase(userRepository);

    getUser.execute().then((data) => {
      setUser(data);
    });
  });

  const handleGeneratePDF = () => {
    const htmlContent = getPDFLayout(incomes, expenses, user!);
    generatePDF(htmlContent);
  };

  return (
    <View style={styles.container}>
      <Text>Esta es una aplicacion de prueba</Text>
      <Button onPress={handleGeneratePDF}>Generar PDF</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
