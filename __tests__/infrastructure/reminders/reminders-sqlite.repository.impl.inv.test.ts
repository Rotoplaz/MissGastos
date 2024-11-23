import { ReminderSqliteRepositoryImpl } from "@/src/infrastructure";

const mockDb = {
  getFirstAsync: jest.fn(),
  runAsync: jest.fn(),
  closeAsync: jest.fn(),
  getAllAsync: jest.fn(),
};

jest.mock("@/src/infrastructure/db/database", () => ({
  getDataBase: jest.fn(() => mockDb),
}));

describe("ReminderSqliteRepositoryImpl - Validaciones y defectos", () => {
  let repository: ReminderSqliteRepositoryImpl;

  beforeEach(() => {
    repository = new ReminderSqliteRepositoryImpl();
    jest.clearAllMocks();
  });

  it("debería lanzar un error al intentar actualizar un recordatorio inexistente", async () => {
   
    mockDb.getFirstAsync.mockResolvedValueOnce(null);

    await expect(
      repository.updateReminder(99, { title: "Nonexistent Reminder" })
    ).rejects.toThrow("Error updating Reminder with id ${id}.");

 
    expect(mockDb.getFirstAsync).toHaveBeenCalledWith(
      "SELECT * FROM Reminder WHERE id = ?",
      [99]
    );

  });

  it("debería lanzar un error al intentar crear un recordatorio con fecha inválida", async () => {

    await expect(
      repository.createReminder({
        title: "Invalid Date Reminder",
        description: "Test reminder",
        dueDate: new Date("Invalid Date"),
        isItPaid: false,
      })
    ).rejects.toThrow("Invalid time value");


    expect(mockDb.runAsync).not.toHaveBeenCalled();
  });

  it("debería lanzar un error al intentar crear un recordatorio con un título vacío", async () => {
   
    await expect(
      repository.createReminder({
        title: "",
        description: "This reminder has no title",
        dueDate: new Date(),
        isItPaid: false,
      })
    ).rejects.toThrow("Cannot read properties of undefined (reading 'lastInsertRowId')");

  
 
  });

  it("debería lanzar un error al intentar eliminar un recordatorio inexistente", async () => {

    mockDb.runAsync.mockRejectedValueOnce(new Error("Reminder doesn't exist"));

    await expect(repository.deleteReminder(99)).rejects.toThrow(
      "Reminder doesn't exist"
    );

   
    expect(mockDb.runAsync).toHaveBeenCalledWith(
      "DELETE FROM Reminder WHERE id = $id",
      { $id: 99 }
    );
  });

  it("debería lanzar un error al intentar recuperar todos los recordatorios si ocurre un problema en la base de datos", async () => {

    mockDb.getAllAsync.mockRejectedValueOnce(
      new Error("Failed to fetch reminders")
    );

    await expect(repository.getAllReminders()).rejects.toThrow(
      "Failed to fetch reminders"
    );


    expect(mockDb.getAllAsync).toHaveBeenCalledWith("SELECT * FROM Reminder");
  });
});
