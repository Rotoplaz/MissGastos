import { RemindersRepository } from "@/src/domain/repositories/reminders.repository";
import { Reminder } from "@/src/domain/entities/reminders.entity";
import { getDataBase } from "../db/database";

export class ReminderSqliteRepositoryImpl implements RemindersRepository {

    async getReminderById(id: number): Promise<Reminder | null> {
        const db = await getDataBase();
       const reminder = await db.getFirstAsync<Reminder>("SELECT * FROM Reminder WHERE id = ?", [id]);
       if (!reminder){
            return null;
       }
       return reminder;

    }

    async createReminder(reminder: Omit<Reminder, "id">): Promise<Reminder> {
        const { title, description, dueDate, isItPaid} = reminder;
        const db = await getDataBase();
        const newReminder = await db.runAsync(
            "INSERT INTO Reminder (title, description, dueDate, isItPaid) VALUES (?,?,?,?)",
            title, description, dueDate.toISOString().split('T')[0], isItPaid);
        return {
            id:newReminder.lastInsertRowId,
            ...reminder,
        };
            
    }

    async updateReminder(id: number, reminder: Partial<Reminder>): Promise<Reminder> {
        const updates: string[]=[];
        const values: (string | boolean | number)[] = [];
        const db = await getDataBase();

        if (reminder.title != undefined){
            updates.push("title = ?");
            values.push(reminder.title);
        }

        if (reminder.description != undefined){
            updates.push("description = ?");
            values.push(reminder.description);
        }

        if (reminder.dueDate != undefined){
            updates.push("dueDate = ?");
            values.push(reminder.dueDate.toISOString().split('T')[0]);
        }
        
        if (reminder.isItPaid != undefined){
            updates.push("isItPaid = ?");
            values.push(reminder.isItPaid)
        }
        const updateQuery = `UPDATE Income SET ${updates.join(", ")} WHERE id = ?`;
        values.push(id);

        await db.runAsync(updateQuery, ...values);

        const updateReminder = await db.getFirstAsync<Reminder>("SELECT * FROM Reminder WHERE id = ?", [id]);

        if (!updateReminder){
            throw new Error("Error updating Reminder with id ${id}. ")
        }

        return updateReminder;
    }
    async deleteReminder(id: number): Promise<void> {
        const db = await getDataBase();
        await db.runAsync('DELETE FROM Reminder WHERE id = $id', {$id: id});
        return;
        
    }
    async getAllReminders(): Promise<Reminder[]> {
        const db = await getDataBase();
       const allReminders = await db.getAllAsync<Reminder>("SELECT * FROM Reminder");
       return allReminders;
    }
        
}