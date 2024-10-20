import { Reminder } from "../entities/reminders.entity";

export interface RemindersRepository {
  getReminderById(id: number): Promise<Reminder | null>;
  createReminder(reminder: Omit<Reminder, "id">): Promise<Reminder>;
  updateReminder(id: number, reminder: Partial<Reminder>): Promise<Reminder>;
  deleteReminder(id: number): Promise<void>;
  getAllReminders(): Promise<Reminder[]>;
}
