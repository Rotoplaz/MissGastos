import { CategoryRepositoryImpl } from "@/src/infrastructure";
import { getDataBase } from "@/src/infrastructure/db/database";

const mockDb = {
  getFirstAsync: jest.fn(),
  runAsync: jest.fn(),
  closeAsync: jest.fn(),
  getAllAsync: jest.fn(),
};

jest.mock("@/src/infrastructure/db/database", () => ({
  getDataBase: jest.fn(() => mockDb),
}));

describe("CategoryRepositoryImpl", () => {
  let repository: CategoryRepositoryImpl;

  beforeEach(() => {
    repository = new CategoryRepositoryImpl();
    jest.clearAllMocks();
  });

  it("debería obtener una categoría por ID", async () => {
    const mockCategory = {
      id: 1,
      type: "Food",
      icon: "🍔",
      color: "#FF5733",
    };
    mockDb.getFirstAsync.mockResolvedValueOnce(mockCategory);

    const category = await repository.getCategoryById(1);

    expect(category).toEqual(mockCategory);
    expect(mockDb.getFirstAsync).toHaveBeenCalledWith(
      "SELECT * FROM Category WHERE id = ?",
      [1]
    );
    expect(mockDb.closeAsync).toHaveBeenCalled();
  });

  it("debería crear una categoría", async () => {
    const newCategory = {
      type: "Travel",
      icon: "✈️",
      color: "#34A853",
    };
    const mockInsertResult = { lastInsertRowId: 2 };
    mockDb.runAsync.mockResolvedValueOnce(mockInsertResult);

    const createdCategory = await repository.createCategory(newCategory);

    expect(createdCategory.id).toBe(2);
    expect(createdCategory.type).toBe(newCategory.type);
    expect(mockDb.runAsync).toHaveBeenCalledWith(
      "INSERT INTO Category (type, icon, color) VALUES (?,?,?)",
      newCategory.type,
      newCategory.icon,
      newCategory.color
    );
    expect(mockDb.closeAsync).toHaveBeenCalled();
  });

  it("debería actualizar una categoría", async () => {
    const mockCategory = {
      id: 1,
      type: "Food",
      icon: "🍔",
      color: "#FF5733",
    };
    const updatedCategory = {
      ...mockCategory,
      type: "Fast Food",
    };

    mockDb.getFirstAsync.mockResolvedValueOnce(mockCategory);
    mockDb.runAsync.mockResolvedValueOnce({});
    mockDb.getFirstAsync.mockResolvedValueOnce(updatedCategory);

    const result = await repository.updateCategory(1, { type: "Fast Food" });

    expect(result).toEqual(updatedCategory);
    expect(mockDb.runAsync).toHaveBeenCalledWith(
      "UPDATE Category SET type = ? WHERE id = ?",
      "Fast Food",
      1
    );
    expect(mockDb.closeAsync).toHaveBeenCalled();
  });

  it("debería eliminar una categoría", async () => {
    mockDb.runAsync.mockResolvedValueOnce({});

    await repository.deleteCategory(1);

    expect(mockDb.runAsync).toHaveBeenCalledWith(
      "DELETE FROM Category WHERE id = $id",
      { $id: 1 }
    );
    expect(mockDb.closeAsync).toHaveBeenCalled();
  });

  it("debería obtener todas las categorías", async () => {
    const mockCategories = [
      {
        id: 1,
        type: "Food",
        icon: "🍔",
        color: "#FF5733",
      },
      {
        id: 2,
        type: "Travel",
        icon: "✈️",
        color: "#34A853",
      },
    ];
    mockDb.getAllAsync.mockResolvedValueOnce(mockCategories);

    const categories = await repository.getAllCategories();

    expect(categories).toEqual(mockCategories);
    expect(mockDb.getAllAsync).toHaveBeenCalledWith("SELECT * FROM Category;");
    expect(mockDb.closeAsync).toHaveBeenCalled();
  });
});
