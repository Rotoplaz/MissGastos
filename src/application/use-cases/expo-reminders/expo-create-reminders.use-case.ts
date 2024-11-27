import { Reminder } from "@/src/domain/entities/reminders.entity";
import * as Notifications from "expo-notifications";

async function ensureNotificationPermissions() {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      if (newStatus !== 'granted') {
        alert('Permission to access notifications was denied');
        return false;
      }
    }
    return true;
  }
  
  export class ExpoCreateRemindersUseCase {
    async execute(reminder: Reminder): Promise<void> {
      console.log(reminder);
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
      });
      
      const hasPermission = await ensureNotificationPermissions();
      if (!hasPermission) return;
  
      const dueDate = new Date(reminder.dueDate);
  
      const triggerDate = new Date(
        dueDate.getFullYear(),
        dueDate.getMonth(),
        dueDate.getDate(),
        12, 0, 0, 0 
      );
  
      if (triggerDate <= new Date()) {
        console.error('Trigger date must be in the future.');
        return;
      }
  
      await Notifications.scheduleNotificationAsync({
        content: {
          title: reminder.title,
          body: reminder.description || "Tienes un recordatorio pendiente",
          data: { reminderId: reminder.id },
        },
        trigger: { seconds: 3 }
      });
  
      console.log('Notification scheduled for:', triggerDate);
    }
  }
  