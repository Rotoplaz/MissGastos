
import { Reminder } from "@/src/domain/entities/reminders.entity";
import { create } from "zustand";

interface RemaindersStoreState {
    reminders: Reminder[];
    addReminder: (reminder: Reminder) => Reminder[];
    deleteReminder: (id: number) => void;
    updateReminder: (reminder: Reminder) =>  Reminder[];
    setReminders: (reminders: Reminder[]) => Reminder[];
}

const initialData = {
    reminders: []
}

export const useRemindersStore = create<RemaindersStoreState>()((set, get)=>({
    ...initialData,
    addReminder: (reminder: Reminder) => {
        set({reminders: [...get().reminders, reminder]})

        return get().reminders;
    },
    deleteReminder: (id: number) => {
        set({reminders: [...get().reminders.filter(reminder => reminder.id !==id)]})
    },
    updateReminder: (reminder: Reminder) => {
        set({reminders: [...get().reminders.map(reminderInStore=>{
            if(reminder.id === reminderInStore.id){
                return reminder;
            }
            return reminderInStore;
        })]})

        return get().reminders;
    },
    setReminders: (reminders: Reminder[]) => {
        set({reminders: reminders});

        return get().reminders;
    }
}));