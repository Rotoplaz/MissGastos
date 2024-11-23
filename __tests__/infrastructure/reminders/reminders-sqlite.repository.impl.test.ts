import { ReminderSqliteRepositoryImpl } from "@/src/infrastructure";
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

describe("ReminderSqliteRepositoryImpl Tests", () => {
  let repository: ReminderSqliteRepositoryImpl;

  beforeEach(() => {
    repository = new ReminderSqliteRepositoryImpl();
  });

  test("getReminderById - Caso exitoso", async () => {
    mockDatabase.getFirstAsync.mockResolvedValueOnce({
      id: 1,
      title: "Test Reminder",
      description: "This is a test reminder",
      dueDate: "2024-11-21",
      isItPaid: false,
    });

    const reminder = await repository.getReminderById(1);

    expect(reminder).toEqual({
      id: 1,
      title: "Test Reminder",
      description: "This is a test reminder",
      dueDate: "2024-11-21",
      isItPaid: false,
    });
    expect(mockDatabase.getFirstAsync).toHaveBeenCalledWith(
      "SELECT * FROM Reminder WHERE id = ?",
      [1]
    );
  });

  test("createReminder - Caso exitoso", async () => {
    mockDatabase.runAsync.mockResolvedValueOnce({ lastInsertRowId: 2 });

    const newReminder = await repository.createReminder({
      title: "New Reminder",
      description: "This is a new reminder",
      dueDate: new Date("2024-11-22"),
      isItPaid: true,
    });

    expect(mockDatabase.runAsync).toHaveBeenCalledWith(
      "INSERT INTO Reminder (title, description, dueDate, isItPaid) VALUES (?,?,?,?)",
      "New Reminder",
      "This is a new reminder",
      "2024-11-22",
      true
    );

    expect(newReminder.id).toBe(2);
    expect(newReminder.title).toBe("New Reminder");
  });

  test("updateReminder - Caso exitoso", async () => {
    mockDatabase.getFirstAsync.mockResolvedValueOnce({
      id: 1,
      title: "Updated Reminder",
      description: "This is an updated reminder",
      dueDate: "2024-11-23",
      isItPaid: true,
    });

    mockDatabase.runAsync.mockResolvedValueOnce(undefined);

    const updatedReminder = await repository.updateReminder(1, {
      title: "Updated Reminder",
      description: "This is an updated reminder",
      dueDate: new Date("2024-11-23"),
      isItPaid: true,
    });

    expect(mockDatabase.runAsync).toHaveBeenCalledWith(
      "UPDATE Income SET title = ?, description = ?, dueDate = ?, isItPaid = ? WHERE id = ?",
      "Updated Reminder",
      "This is an updated reminder",
      "2024-11-23",
      true,
      1
    );
    expect(updatedReminder.id).toBe(1);
    expect(updatedReminder.title).toBe("Updated Reminder");
  });

  test("updateReminder - Error al no encontrar el recordatorio", async () => {
    mockDatabase.getFirstAsync.mockResolvedValueOnce(null);

    await expect(
      repository.updateReminder(3, { title: "Nonexistent Reminder" })
    ).rejects.toThrow("Error updating Reminder with id ${id}.");
    expect(mockDatabase.getFirstAsync).toHaveBeenCalledWith(
      "SELECT * FROM Reminder WHERE id = ?",
      [3]
    );
  });

  test("deleteReminder - Caso exitoso", async () => {
    mockDatabase.runAsync.mockResolvedValueOnce(undefined);

    await repository.deleteReminder(1);

    expect(mockDatabase.runAsync).toHaveBeenCalledWith(
      "DELETE FROM Reminder WHERE id = $id",
      { $id: 1 }
    );
  });

  test("getAllReminders - Caso exitoso", async () => {
    mockDatabase.getAllAsync.mockResolvedValueOnce([
      {
        id: 1,
        title: "Reminder 1",
        description: "This is the first reminder",
        dueDate: "2024-11-21",
        isItPaid: false,
      },
      {
        id: 2,
        title: "Reminder 2",
        description: "This is the second reminder",
        dueDate: "2024-11-22",
        isItPaid: true,
      },
    ]);

    const reminders = await repository.getAllReminders();

    expect(reminders).toEqual([
      {
        id: 1,
        title: "Reminder 1",
        description: "This is the first reminder",
        dueDate: "2024-11-21",
        isItPaid: false,
      },
      {
        id: 2,
        title: "Reminder 2",
        description: "This is the second reminder",
        dueDate: "2024-11-22",
        isItPaid: true,
      },
    ]);
    expect(mockDatabase.getAllAsync).toHaveBeenCalledWith(
      "SELECT * FROM Reminder"
    );
  });
});
