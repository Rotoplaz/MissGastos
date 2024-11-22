import { Category } from "@/src/domain/entities/category.entity";
import { CategoryRepositoryImpl } from "@/src/infrastructure";

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
  });

  it("debería actualizar una categoría existente", async () => {
    const mockCategory: Category = {
      id: 1,
      type: "Electronics",
      icon: "icon-electronics",
      color: "blue",
    };

    const mockUpdatedCategory: Category = {
      id: 1,
      type: "Updated Electronics",
      icon: "icon-electronics",
      color: "red",
    };

    // Simulando que el primer getFirstAsync devuelve la categoría original
    mockDb.getFirstAsync.mockResolvedValueOnce(mockCategory);

    // Simulando el éxito de la ejecución de la actualización
    mockDb.runAsync.mockResolvedValueOnce({});

    // Simulando que el segundo getFirstAsync devuelve la categoría actualizada
    mockDb.getFirstAsync.mockResolvedValueOnce(mockUpdatedCategory);

    const updatedCategory = await repository.updateCategory(1, {
      type: "Updated Electronics",
      color: "red",
    });

    // Verificando que la categoría actualizada coincide con la esperada
    expect(updatedCategory).toEqual(mockUpdatedCategory);

    // Verificando que la consulta de actualización fue llamada con los parámetros correctos
    expect(mockDb.runAsync).toHaveBeenCalledWith(
      "UPDATE Category SET type = ?, color = ? WHERE id = ?",
      "Updated Electronics",
      "red",
      1
    );

    // Verificando que la conexión se cierra después de la operación
    expect(mockDb.closeAsync).toHaveBeenCalled();
  });

  it("debería lanzar un error si la categoría no se encuentra al intentar actualizar", async () => {
    // Simulando que no se encuentra la categoría
    const mockCategory = null;

    mockDb.getFirstAsync.mockResolvedValueOnce(mockCategory);

    // Verificando que se lanza el error adecuado
    await expect(
      repository.updateCategory(1, { type: "Nonexistent Category" })
    ).rejects.toThrow("Category not found after update");

    // Verificando que la conexión se cierra después de la operación
    expect(mockDb.closeAsync).toHaveBeenCalled();
  });

  it("debería devolver una categoría si se encuentra por id", async () => {
    const mockCategory: Category = {
      id: 1,
      type: "Electronics",
      icon: "icon-electronics",
      color: "blue",
    };

    // Simulando que getFirstAsync devuelve la categoría
    mockDb.getFirstAsync.mockResolvedValueOnce(mockCategory);

    // Verificando que se devuelve la categoría correcta
    const result = await repository.getCategoryById(1);
    expect(result).toEqual(mockCategory);

    // Verificando que la conexión se cierra después de la operación
    expect(mockDb.closeAsync).toHaveBeenCalled();
  });

  it("debería devolver null si no encuentra la categoría por id", async () => {
    // Simulando que no se encuentra la categoría
    mockDb.getFirstAsync.mockResolvedValueOnce(null);

    // Verificando que se devuelve null
    const result = await repository.getCategoryById(1);
    expect(result).toBeNull();

    // Verificando que la conexión se cierra después de la operación
    expect(mockDb.closeAsync).toHaveBeenCalled();
  });

  it("debería eliminar una categoría existente", async () => {
    const mockCategory: Category = {
      id: 1,
      type: "Electronics",
      icon: "icon-electronics",
      color: "blue",
    };

    // Simulando que la categoría existe
    mockDb.getFirstAsync.mockResolvedValueOnce(mockCategory);

    // Simulando la ejecución exitosa de la eliminación
    mockDb.runAsync.mockResolvedValueOnce({});

    // Verificando que el método de eliminación no lance errores
    await expect(repository.deleteCategory(1)).resolves.toBeUndefined();

    // Verificando que la eliminación fue ejecutada correctamente
    expect(mockDb.runAsync).toHaveBeenCalledWith(
      "DELETE FROM Category WHERE id = $id",
      { $id: 1 }
    );

    // Verificando que la conexión se cierra después de la operación
    expect(mockDb.closeAsync).toHaveBeenCalled();
  });

  it("debería lanzar un error si la categoría no existe al intentar eliminar", async () => {
    // Simulando que no se encuentra la categoría
    mockDb.getFirstAsync.mockResolvedValueOnce(null);

    // Verificando que se lanza el error adecuado
    await expect(repository.deleteCategory(1)).rejects.toThrow(
      "Category doesn't exist"
    );

    // Verificando que la conexión se cierra después de la operación
    expect(mockDb.closeAsync).toHaveBeenCalled();
  });

  it("debería devolver todas las categorías", async () => {
    const mockCategories: Category[] = [
      {
        id: 1,
        type: "Electronics",
        icon: "icon-electronics",
        color: "blue",
      },
      {
        id: 2,
        type: "Clothing",
        icon: "icon-clothing",
        color: "green",
      },
    ];

    // Simulando que getAllAsync devuelve todas las categorías
    mockDb.getAllAsync.mockResolvedValueOnce(mockCategories);

    // Verificando que se devuelven las categorías correctas
    const categories = await repository.getAllCategories();
    expect(categories).toEqual(mockCategories);

    // Verificando que la conexión se cierra después de la operación
    expect(mockDb.closeAsync).toHaveBeenCalled();
  });
});
