import { CreditCardCrudRepositoryImpl } from "@/src/infrastructure";

const mockDb = {
  getFirstAsync: jest.fn(),
  runAsync: jest.fn(),
  closeAsync: jest.fn(),
  getAllAsync: jest.fn(),
};

jest.mock("@/src/infrastructure/db/database", () => ({
  getDataBase: jest.fn(() => mockDb),
}));

describe("CreditCardCrudRepositoryImpl", () => {
  let repository: CreditCardCrudRepositoryImpl;

  beforeEach(() => {
    repository = new CreditCardCrudRepositoryImpl();
  });

  it("debería obtener una tarjeta de crédito por ID", async () => {
    const mockCard = {
      id: 1,
      name: "Visa",
      lastFourDigits: "1234",
      debt: 200,
      creditLimit: 500,
      type: "credit",
      dueDate: new Date(),
    };
    mockDb.getFirstAsync.mockResolvedValueOnce(mockCard);

    const card = await repository.getCreditCardById(1);

    expect(card).toEqual(mockCard);
    expect(mockDb.getFirstAsync).toHaveBeenCalledWith(
      "SELECT * FROM Card WHERE id = ?",
      [1]
    );
    expect(mockDb.closeAsync).toHaveBeenCalled();
  });

  it("debería crear una tarjeta de crédito", async () => {
    const newCard = {
      name: "MasterCard",
      lastFourDigits: "5678",
      debt: 100,
      creditLimit: 1000,
      type: "credit" as "credit",
      dueDate: new Date(),
    };
    const mockInsertResult = { lastInsertRowId: 2 };
    mockDb.runAsync.mockResolvedValueOnce(mockInsertResult);

    const createdCard = await repository.createCreditCard(newCard);

    expect(createdCard.id).toBe(2);
    expect(createdCard.name).toBe(newCard.name);
    expect(mockDb.runAsync).toHaveBeenCalledWith(
      "INSERT INTO Card (name, lastFourDigits, debt, type, creditLimit, dueDate) VALUES (?,?,?,?,?,?)",
      newCard.name,
      newCard.lastFourDigits,
      newCard.debt,
      newCard.type,
      newCard.creditLimit,
      newCard.dueDate.toISOString().split("T")[0]
    );
    expect(mockDb.closeAsync).toHaveBeenCalled();
  });

  it("debería eliminar una tarjeta de crédito", async () => {
    mockDb.runAsync.mockResolvedValueOnce({});

    await repository.deleteCreditCard(1);

    expect(mockDb.runAsync).toHaveBeenCalledWith(
      "DELETE FROM Card WHERE id = $id",
      { $id: 1 }
    );
    expect(mockDb.closeAsync).toHaveBeenCalled();
  });

  it("debería actualizar una tarjeta de crédito", async () => {
    const mockCard = {
      id: 1,
      name: "Visa",
      lastFourDigits: "1234",
      debt: 200,
      creditLimit: 500,
      type: "credit",
      dueDate: new Date(),
    };

    const updatedCard = {
      ...mockCard,
      name: "VisaUpdated",
    };

    // Mock el estado inicial de la tarjeta y el resultado de la actualización.
    mockDb.getFirstAsync.mockResolvedValueOnce(mockCard); // Recuperar la tarjeta original
    mockDb.runAsync.mockResolvedValueOnce({}); // Simular una actualización exitosa
    mockDb.getFirstAsync.mockResolvedValueOnce(updatedCard); // Devolver la tarjeta actualizada en la siguiente llamada

    const result = await repository.updateCreditCard(1, {
      name: "VisaUpdated",
    });

    expect(result).toEqual(updatedCard);
    expect(mockDb.runAsync).toHaveBeenCalledWith(
      "UPDATE Card SET name = ? WHERE id = ?",
      "VisaUpdated",
      1
    );
    expect(mockDb.closeAsync).toHaveBeenCalled();
  });

  it("debería obtener todas las tarjetas de crédito", async () => {
    const mockCards = [
      {
        id: 1,
        name: "Visa",
        lastFourDigits: "1234",
        debt: 200,
        creditLimit: 500,
        type: "credit",
        dueDate: new Date(),
      },
      {
        id: 2,
        name: "MasterCard",
        lastFourDigits: "5678",
        debt: 100,
        creditLimit: 1000,
        type: "credit",
        dueDate: new Date(),
      },
    ];
    mockDb.getAllAsync.mockResolvedValueOnce(mockCards);

    const cards = await repository.getAllCreditCards();

    expect(cards).toEqual(mockCards);
    expect(mockDb.getAllAsync).toHaveBeenCalledWith(
      "SELECT * FROM Card WHERE type = 'credit'"
    );
    expect(mockDb.closeAsync).toHaveBeenCalled();
  });
});
