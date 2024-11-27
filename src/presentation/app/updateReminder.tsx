import { useLocalSearchParams } from "expo-router";
import { ReminderForm } from "../reminders/components/ReminderForm";
import { useEffect, useState } from "react";
import { Reminder } from "@/src/domain/entities/reminders.entity";
import { ReminderSqliteRepositoryImpl } from "@/src/infrastructure";
import { GetReminderByIdUseCase } from "@/src/application/use-cases/reminders/get-reminder-by-id.use-case";
import { FullLoaderScreen } from "../common/screens/loaders/FullLoaderScreen";

export const updateReminder = () => {
  const params = useLocalSearchParams<{ id: string }>();
  const [reminder, setReminder] = useState<Reminder | null>(null);
  useEffect(() => {
    const getReminder = async () => {
      const repository = new ReminderSqliteRepositoryImpl();
      const reminder = await new GetReminderByIdUseCase(repository).execute(
        +params.id
      );
      setReminder(reminder);
    };
    getReminder();
  }, []);
  if (!reminder) return <FullLoaderScreen />;

  return <ReminderForm reminder={reminder} />;
};

export default updateReminder;
