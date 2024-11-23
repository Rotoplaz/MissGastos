import { ExpenseSqliteRepositoryImpl } from "@/src/infrastructure";

const mockDb = {
    getFirstAsync: jest.fn(),
    runAsync: jest.fn(),
    closeAsync: jest.fn(),
    getAllAsync: jest.fn(),
  };
  
  jest.mock("@/src/infrastructure/db/database", () => ({
    getDataBase: jest.fn(() => mockDb),
  }));
  

describe("ExpenseSqliteRepositoryImpl - Validaciones y defectos", () => {
  let repository: ExpenseSqliteRepositoryImpl;

  beforeEach(() => {
    repository = new ExpenseSqliteRepositoryImpl();
    jest.clearAllMocks();
  });

  it("debería lanzar un error al intentar obtener un gasto inexistente", async () => {
    mockDb.getFirstAsync.mockResolvedValueOnce(null);

    await expect(repository.getExpenseById(999)).resolves.toBeNull();

    expect(mockDb.getFirstAsync).toHaveBeenCalledWith(
      "SELECT * FROM Expense WHERE id = ?",
      [999]
    );
    expect(mockDb.closeAsync).toHaveBeenCalled();
  });

  it("debería lanzar un error al intentar crear un gasto con método de pago inválido", async () => {
    const invalidExpense = {
      amount: 150,
      concept: "Invalid expense",
      category: { id: 2, type: "Invalid", icon: "star-icon", color: "gray" },
      paymentMethod: { type: "invalid" } as any,
      date: new Date(),
    };

    await expect(repository.createExpense(invalidExpense)).rejects.toThrow(
      "PaymentMethod not allowed"
    );

  });

});
