import { RemindersRepository } from "@/src/domain/repositories/reminders.repository";
import { migrateDbIfNeeded } from "../db/migration";
import * as SQLite from "expo-sqlite";
import { Reminder } from "@/src/domain/entities/reminders.entity";

export class ReminderSqliteRepositoryImpl implements RemindersRepository {

        private db: SQLite.SQLiteDatabase =
        SQLite.openDatabaseSync("MissGastosDataBase");

    constructor(){
        migrateDbIfNeeded(this.db);
    }

    async getReminderById(id: number): Promise<Reminder | null> {
       const reminder = await this.db.getFirstAsync<Reminder>("SELECT * FROM Reminder WHERE id = ?", [id]);
       if (!reminder){
            return null;
       }
       return reminder;

    }

    async createReminder(reminder: Omit<Reminder, "id">): Promise<Reminder> {
        const { title, description, dueDate, isItPaid} = reminder;
        const newReminder = await this.db.runAsync(
            "INSERT INTO Reminder (title, description, dueDate, isItPaid) VALUES (?,?,?,?)",
            title, description, dueDate.toISOString(), isItPaid);
        return {
            id:newReminder.lastInsertRowId,
            ...reminder,
        };
            
    }

    async updateReminder(id: number, reminder: Partial<Reminder>): Promise<Reminder> {
        const updates: string[]=[];
        const values: (string | boolean | number)[] = [];

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
            values.push(reminder.dueDate.toISOString());
        }
        
        if (reminder.isItPaid != undefined){
            updates.push("isItPaid = ?");
            values.push(reminder.isItPaid)
        }
        const updateQuery = `UPDATE Income SET ${updates.join(", ")} WHERE id = ?`;
        values.push(id);

        await this.db.runAsync(updateQuery, ...values);

        const updateReminder = await this.db.getFirstAsync<Reminder>("SELECT * FROM Reminder WHERE id = ?", [id]);

        if (!updateReminder){
            throw new Error("Error updating Reminder with id ${id}. ")
        }

        return updateReminder;
    }
    async deleteReminder(id: number): Promise<void> {
        await this.db.runAsync('DELETE FROM Reminder WHERE id = $id', {$id: id});
        return;
        
    }
    async getAllReminders(): Promise<Reminder[]> {
       const allReminders = await this.db.getAllAsync<Reminder>("SELECT * FROM Reminder");
       return allReminders;
    }
        
}