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

describe("CreditCardCrudRepositoryImpl - Validaciones y defectos", () => {
  let repository: DebitCardRepositoryImpl;

  beforeEach(() => {
    repository = new DebitCardRepositoryImpl();
    jest.clearAllMocks();
  });

  it("debería lanzar un error al intentar actualizar una tarjeta inexistente", async () => {
    mockDb.getFirstAsync.mockResolvedValueOnce(null); // No encuentra la tarjeta

    await expect(repository.updateDebitCard(99, { name: "UpdatedName" })).rejects.toThrow(
      "card not found"
    );

    expect(mockDb.runAsync).not.toHaveBeenCalled();
  });

  it("debería lanzar un error al intentar eliminar una tarjeta inexistente", async () => {
    mockDb.runAsync.mockRejectedValueOnce(new Error("Card doesn't exist"));

    await expect(repository.deleteDebitCard(99)).rejects.toThrow(
      "Card doesn't exist"
    );

    expect(mockDb.closeAsync).toHaveBeenCalled();
  });
});
