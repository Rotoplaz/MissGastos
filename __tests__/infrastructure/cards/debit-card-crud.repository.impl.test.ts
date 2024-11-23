import { DebitCardRepositoryImpl } from "@/src/infrastructure";

const mockDb = {
  getFirstAsync: jest.fn(),
  runAsync: jest.fn(),
  closeAsync: jest.fn(),
  getAllAsync: jest.fn(),
};

jest.mock("@/src/infrastructure/db/database", () => ({
  getDataBase: jest.fn(() => mockDb),
}));

describe("DebitCardRepositoryImpl", () => {
  let repository: DebitCardRepositoryImpl;

  beforeEach(() => {
    repository = new DebitCardRepositoryImpl();
  });

  it("debería obtener una tarjeta de débito por ID", async () => {
    const mockCard = {
      id: 1,
      name: "Visa Debit",
      lastFourDigits: "4321",
      debt: 0,
      currentBalance: 1500,
      type: "debit",
      limitDebit: 3000,
    };
    mockDb.getFirstAsync.mockResolvedValueOnce(mockCard);

    const card = await repository.getDebitCardById(1);

    expect(card).toEqual(mockCard);
    expect(mockDb.getFirstAsync).toHaveBeenCalledWith(
      "SELECT * FROM Card WHERE id = ?",
      [1]
    );
    expect(mockDb.closeAsync).toHaveBeenCalled();
  });

  it("debería crear una tarjeta de débito", async () => {
    const newCard = {
      name: "Master Debit",
      lastFourDigits: "8765",
      debt: 0,
      currentBalance: 2000,
      type: "debit" as "debit",
      limitDebit: 5000,
    };
    const mockInsertResult = { lastInsertRowId: 2 };
    mockDb.runAsync.mockResolvedValueOnce(mockInsertResult);

    const createdCard = await repository.createDebitCard(newCard);

    expect(createdCard.id).toBe(2);
    expect(createdCard.name).toBe(newCard.name);
    expect(mockDb.runAsync).toHaveBeenCalledWith(
      "INSERT INTO Card (name, lastFourDigits, debt, type, currentBalance, limitDebit) VALUES (?,?,?,?,?,?)",
      newCard.name,
      newCard.lastFourDigits,
      newCard.debt,
      newCard.type,
      newCard.currentBalance,
      newCard.limitDebit
    );
    expect(mockDb.closeAsync).toHaveBeenCalled();
  });

  it("debería actualizar una tarjeta de débito", async () => {
    const mockCard = {
      id: 1,
      name: "Visa Debit",
      lastFourDigits: "4321",
      debt: 0,
      currentBalance: 1500,
      type: "debit",
      limitDebit: 3000,
    };

    const updatedCard = {
      ...mockCard,
      name: "Visa Debit Updated",
    };

    mockDb.getFirstAsync.mockResolvedValueOnce(mockCard); // Recuperar tarjeta original
    mockDb.runAsync.mockResolvedValueOnce({}); // Simular actualización exitosa
    mockDb.getFirstAsync.mockResolvedValueOnce(updatedCard); // Devolver tarjeta actualizada

    const result = await repository.updateDebitCard(1, {
      name: "Visa Debit Updated",
    });

    expect(result).toEqual(updatedCard);
    expect(mockDb.runAsync).toHaveBeenCalledWith(
      "UPDATE Card SET name = ? WHERE id = ?",
      "Visa Debit Updated",
      1
    );
    expect(mockDb.closeAsync).toHaveBeenCalled();
  });

  it("debería eliminar una tarjeta de débito", async () => {
    mockDb.runAsync.mockResolvedValueOnce({});

    await repository.deleteDebitCard(1);

    expect(mockDb.runAsync).toHaveBeenCalledWith(
      "DELETE FROM Card WHERE id = $id",
      { $id: 1 }
    );
    expect(mockDb.closeAsync).toHaveBeenCalled();
  });

  it("debería obtener todas las tarjetas de débito", async () => {
    const mockCards = [
      {
        id: 1,
        name: "Visa Debit",
        lastFourDigits: "4321",
        debt: 0,
        currentBalance: 1500,
        type: "debit",
        limitDebit: 3000,
      },
      {
        id: 2,
        name: "Master Debit",
        lastFourDigits: "8765",
        debt: 0,
        currentBalance: 2000,
        type: "debit",
        limitDebit: 5000,
      },
    ];
    mockDb.getAllAsync.mockResolvedValueOnce(mockCards);

    const cards = await repository.getAllDebitCards();

    expect(cards).toEqual(mockCards);
    expect(mockDb.getAllAsync).toHaveBeenCalledWith(
      "SELECT * FROM Card WHERE type = 'debit'"
    );
    expect(mockDb.closeAsync).toHaveBeenCalled();
  });
});
