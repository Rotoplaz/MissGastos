import { IncomeSqliteRepositoryImpl } from "@/src/infrastructure";

const mockDatabase = {
  getFirstAsync: jest.fn(),
  runAsync: jest.fn(),
  closeAsync: jest.fn(),
  getAllAsync: jest.fn(),
};


jest.mock("@/src/infrastructure/db/database", () => ({
    getDataBase: jest.fn(() => mockDatabase),
  }));

describe("IncomeSqliteRepositoryImpl Tests", () => {
  let repository: IncomeSqliteRepositoryImpl;

  beforeEach(() => {
    repository = new IncomeSqliteRepositoryImpl();
  });

  test("getIncomeById - Caso exitoso", async () => {
    mockDatabase.getFirstAsync.mockResolvedValueOnce({
      id: 1,
      amount: 100,
      concept: "Test",
      date: "2024-11-21",
    });

    const income = await repository.getIncomeById(1);

    expect(income).toEqual({
      id: 1,
      amount: 100,
      concept: "Test",
      date: "2024-11-21",
    });
    expect(mockDatabase.getFirstAsync).toHaveBeenCalledWith(
      "SELECT * FROM Income WHERE id = ?",
      [1]
    );
  });

  test("createIncome - Caso exitoso", async () => {
    mockDatabase.runAsync.mockResolvedValueOnce({ lastInsertRowId: 2 });
    
    const newIncome = await repository.createIncome({
      amount: 200,
      concept: "Salary",
      date: new Date("2024-11-20"),
    });
  

    expect(mockDatabase.runAsync).toHaveBeenCalledWith(
      "INSERT INTO Income (amount, concept, date) VALUES (?, ?, ?)",
      200, "Salary", "2024-11-20"
    );
    
    expect(newIncome.id).toBe(2);
    expect(newIncome.amount).toBe(200);
  });
  

  test("updateIncome - Error al no encontrar el ingreso", async () => {
    mockDatabase.getFirstAsync.mockResolvedValueOnce(null);

    await expect(
      repository.updateIncome(3, { amount: 500 })
    ).rejects.toThrow("Error updating Income with id ${id}.");
    expect(mockDatabase.getFirstAsync).toHaveBeenCalledWith(
      "SELECT * FROM Income WHERE id = ?",
      [3]
    );
  });

  test("deleteIncome - Caso exitoso", async () => {
    mockDatabase.runAsync.mockResolvedValueOnce(undefined);
    await repository.deleteIncome(1);
    expect(mockDatabase.runAsync).toHaveBeenCalledWith(
      "DELETE FROM Income WHERE id = $id",
      { $id: 1 }
    );
  });

  test("getAllIncome - Caso exitoso", async () => {
    mockDatabase.getAllAsync.mockResolvedValueOnce([
      { id: 1, amount: 100, concept: "Test", date: "2024-11-21" },
      { id: 2, amount: 200, concept: "Salary", date: "2024-11-20" },
    ]);

    const incomes = await repository.getAllIncome();

    expect(incomes).toEqual([
      { id: 1, amount: 100, concept: "Test", date: "2024-11-21" },
      { id: 2, amount: 200, concept: "Salary", date: "2024-11-20" },
    ]);
    expect(mockDatabase.getAllAsync).toHaveBeenCalledWith(
      "SELECT * FROM Income"
    );
  });
});
