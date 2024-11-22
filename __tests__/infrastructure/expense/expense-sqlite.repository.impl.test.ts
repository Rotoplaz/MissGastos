import { ExpenseSqliteRepositoryImpl } from "@/src/infrastructure";
import { getDataBase } from "@/src/infrastructure/db/database";


const mockDatabase = {
  getFirstAsync: jest.fn(),
  runAsync: jest.fn(),
  closeAsync: jest.fn(),
  getAllAsync: jest.fn(),
};

jest.mock("@/src/infrastructure/db/database", () => ({
  getDataBase: jest.fn(() => mockDatabase),
}));

describe("ExpenseSqliteRepositoryImpl Tests", () => {
  let repository: ExpenseSqliteRepositoryImpl;

  beforeEach(() => {
    repository = new ExpenseSqliteRepositoryImpl();
  });

  test("getExpensesGroupByCategory - Caso exitoso", async () => {
    const mockExpenses = [
      { type: "Food", totalExpense: 200, color: "red" },
      { type: "Transport", totalExpense: 150, color: "blue" },
    ];

    mockDatabase.getAllAsync.mockResolvedValueOnce(mockExpenses);

    const expenses = await repository.getExpensesGroupByCategory();

    expect(expenses).toEqual(mockExpenses);
    expect(mockDatabase.getAllAsync).toHaveBeenCalledWith(
      expect.stringContaining("SELECT  c.color, c.type, SUM(e.amount) AS totalExpense FROM Expense e JOIN Category c ON e.categoryId = c.id GROUP BY c.type;")
    );
  });

  test("getExpenseById - Caso exitoso", async () => {
    mockDatabase.getFirstAsync.mockResolvedValueOnce({
      id: 1,
      amount: 100,
      concept: "Lunch",
      category: { id: 1, type: "Food", color: "red" },
      paymentMethod: { type: "cash", id: null },
      date: new Date("2024-11-20"),
    });

    const expense = await repository.getExpenseById(1);

    expect(expense).toEqual({
      id: 1,
      amount: 100,
      concept: "Lunch",
      category: { id: 1, type: "Food", color: "red" },
      paymentMethod: { type: "cash", id: null },
      date: new Date("2024-11-20"),
    });
    expect(mockDatabase.getFirstAsync).toHaveBeenCalledWith(
      "SELECT * FROM Expense WHERE id = ?",
      [1]
    );
  });

  test("createExpense - Caso exitoso", async () => {
    mockDatabase.runAsync.mockResolvedValueOnce({ lastInsertRowId: 2 });

    const newExpense = await repository.createExpense({
      amount: 200,
      concept: "Shopping",
      category: { id: 1, type: "Shopping", color: "green" ,icon:"star"},
      paymentMethod: { type: "cash"},
      date: new Date("2024-11-20"),
    });

    expect(mockDatabase.runAsync).toHaveBeenCalledWith(
      "INSERT INTO Expense (amount, concept, categoryId, paymentMethod, cardId,date) VALUES (?,?,?,?,?,?)",
      200,
      "Shopping",
      1,
      "cash",
      null,
      "2024-11-20"
    );
    
    expect(newExpense.id).toBe(2);
    expect(newExpense.amount).toBe(200);
  });

  test("updateExpense - Error al no encontrar el gasto", async () => {
    mockDatabase.getFirstAsync.mockResolvedValueOnce(null);

    await expect(
      repository.updateExpense(3, { amount: 500 })
    ).rejects.toThrow("PaymentMethod not allowed");
    expect(mockDatabase.getFirstAsync).toHaveBeenCalledWith(
      "SELECT * FROM Expense WHERE id = ?",
      [1]
    );
  });

  test("deleteExpense - Caso exitoso", async () => {
    mockDatabase.runAsync.mockResolvedValueOnce(undefined);

    await repository.deleteExpense(1);

    expect(mockDatabase.runAsync).toHaveBeenCalledWith(
      "DELETE FROM Expense WHERE id = $id",
      { $id: 1 }
    );
  });

  test("getAllExpense - Caso exitoso", async () => {
    mockDatabase.getAllAsync.mockResolvedValueOnce([
      { id: 1, amount: 100, concept: "Lunch", category: { type: "Food", color: "red" },
       paymentMethod: { type: "cash", id: null }, date: new Date("2024-11-20") },
      { id: 2, amount: 150, concept: "Transport", category: { type: "Transport", color: "blue" },
       paymentMethod: { type: "credit", id: 124 }, date: new Date("2024-11-21") },
    ]);

    const expenses = await repository.getAllExpenses();

    expect(expenses).toEqual([
      { id: 1, amount: 100, concept: "Lunch", category: { type: "Food", color: "red" },
       paymentMethod: { type: "cash", id: null }, date: new Date("2024-11-20") },
      { id: 2, amount: 150, concept: "Transport", category: { type: "Transport", color: "blue" },
       paymentMethod: { type: "credit", id: 124 }, date: new Date("2024-11-21") },
    ]);
    expect(mockDatabase.getAllAsync).toHaveBeenCalledWith(
      "SELECT * FROM Expense"
    );
  });
});
