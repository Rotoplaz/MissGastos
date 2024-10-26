import { Reminder } from "@/src/domain/entities/reminders.entity";
import { RemindersRepository } from "@/src/domain/repositories/reminders.repository";
import * as Notifications from "expo-notifications";

export class ExpoDeleteReminderUseCase{

    constructor(
        private readonly reminderRepository:RemindersRepository){}

    async execute(reminder:Reminder): Promise<void> {
        const getReminder = await this.reminderRepository.getReminderById(reminder.id);
        if (getReminder) {
            await Notifications.cancelScheduledNotificationAsync(reminder.id.toString());
        }
    }
}