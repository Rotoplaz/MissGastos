import { Reminder } from "@/src/domain/entities/reminders.entity";
import * as Notifications from "expo-notifications";


export class ExpoCreateRemindersUseCase{

    async execute(reminder:Reminder): Promise <void> {
        const triggerDate = new Date(reminder.dueDate);

        if (triggerDate > new Date()){
            await Notifications.scheduleNotificationAsync({
                content:{
                    title: reminder.title,
                    body: reminder.description || "You have a pending reminder",
                    data: { reminderId: reminder.id },
                },
                trigger:{date: triggerDate},
            });
        }
    }
}
