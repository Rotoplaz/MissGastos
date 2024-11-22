import { UserRepositorySqliteImpl } from "@/src/infrastructure/user/user-sqli.repository.impl";

const mockDb = {
  getFirstAsync: jest.fn(),
  runAsync: jest.fn(),
  closeAsync: jest.fn(),
};

jest.mock("@/src/infrastructure/db/database", () => ({
  getDataBase: jest.fn(() => mockDb),
}));

describe("UserRepositorySqliteImpl", () => {
  let repository: UserRepositorySqliteImpl;

  beforeEach(() => {
    repository = new UserRepositorySqliteImpl();
  });

  it("debería actualizar un usuario existente", async () => {
    const mockUser = {
      id: 1,
      name: "Jane",
      globalLimitBudget: 500,
      profilePictureUrl: "https://example.com/jane.jpg",
    };

    const mockUpdatedUser = {
      ...mockUser,
      name: "Jane Updated",
      globalLimitBudget: 600,
    };

    mockDb.getFirstAsync.mockResolvedValueOnce(mockUser);

    mockDb.runAsync.mockResolvedValueOnce({});

    mockDb.getFirstAsync.mockResolvedValueOnce(mockUpdatedUser);

    const updatedUser = await repository.updateUser({
      name: "Jane Updated",
      globalLimitBudget: 600,
    });

    expect(updatedUser).toEqual(mockUpdatedUser);

    expect(mockDb.runAsync).toHaveBeenCalledWith(
      "UPDATE User SET name = ?, globalLimitBudget = ? WHERE id = ?",
      "Jane Updated",
      600,
      1
    );

    expect(mockDb.closeAsync).toHaveBeenCalled();
  });

  it("debería lanzar un error si el usuario no se encuentra al intentar actualizar", async () => {
    const mockUser = null;

    mockDb.getFirstAsync.mockResolvedValueOnce(mockUser);

    await expect(
      repository.updateUser({ name: "Nonexistent User" })
    ).rejects.toThrow("user not found");

    expect(mockDb.closeAsync).toHaveBeenCalled();
  });
});
