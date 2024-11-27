import {
  Button,
  Datepicker,
  Icon,
  Input,
  Layout,
  Text,
  Toggle,
  TopNavigationAction,
} from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { ReminderSqliteRepositoryImpl } from "@/src/infrastructure";
import { CreateReminderUseCase } from "@/src/application/use-cases/reminders/create-reminder.use-case";
import { UpdateReminderUseCase } from "@/src/application/use-cases/reminders/update-reminder.use-case";
import { router } from "expo-router";
import { ExpoCreateRemindersUseCase } from "@/src/application/use-cases/expo-reminders/expo-create-reminders.use-case";
import { LayoutWithTopNavigation } from "../../common/layouts/LayoutWithTopNavigation";
import { Reminder } from "@/src/domain/entities/reminders.entity";
import { useRemindersStore } from "../../store/remainders/useStoreRemainders";
import { DeleteReminderUseCase } from "@/src/application/use-cases/reminders/delete-reminder.use-case";

const reminderSchema = z.object({
  title: z.string().min(1, "El título es obligatorio."),
  description: z.string().min(1, "La descripción es obligatoria."),
  dueDate: z.date({ required_error: "Debes seleccionar una fecha." }),
  isItPaid: z.boolean(),
});

type ReminderFormData = z.infer<typeof reminderSchema>;

interface Props {
  reminder: Reminder | null;
}

export const ReminderForm = ({ reminder }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ReminderFormData>({
    resolver: zodResolver(reminderSchema),
    defaultValues: reminder
      ? {
          title: reminder.title,
          description: reminder.description,
          dueDate: new Date(reminder.dueDate),
          isItPaid: reminder.isItPaid ? true : false,
        }
      : {
          title: "",
          description: "",
          dueDate: new Date(),
          isItPaid: false,
        },
  });
  console.log(errors);
  const updateReminder = useRemindersStore((state) => state.updateReminder);
  const addReminder = useRemindersStore((state) => state.addReminder);  
  const deleteReminderStore = useRemindersStore((state) => state.deleteReminder);  

  const onSubmit = async (data: ReminderFormData) => {
    const repository = new ReminderSqliteRepositoryImpl();

    if (reminder) {
      const reminderUpdated = await new UpdateReminderUseCase(
        repository
      ).execute(reminder.id, {
        description: data.description,
        dueDate: data.dueDate,
        isItPaid: data.isItPaid,
        title: data.title,
      });
      updateReminder(reminderUpdated);
    } else {
      const newReminder = await new CreateReminderUseCase(repository).execute({
        description: data.description,
        dueDate: data.dueDate,
        isItPaid: data.isItPaid,
        title: data.title,
      });
      new ExpoCreateRemindersUseCase().execute(newReminder);
      addReminder(newReminder);
    }

    router.back();
  };

  const deleteReminder = async () => {
    
    const repository = new ReminderSqliteRepositoryImpl();

    await new DeleteReminderUseCase(repository).execute(reminder?.id!);
    deleteReminderStore(reminder?.id!)
    router.back();
  }

  return (
    <LayoutWithTopNavigation
      titleScreen={reminder ? "Actualizar recordatorio" : "Crear recordatorio"}
      style={{ paddingTop: "10%" }}
      accessoryRight={
        reminder
          ? () => (
              <TopNavigationAction
                icon={<Icon name="trash-outline" fill="red" />}
                onPress={deleteReminder}
              />
            )
          : undefined
      }
    >
      <Layout style={{ flex: 1, paddingHorizontal: 20 }}>
        <Controller
          name="title"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Título"
              style={{ marginVertical: 10 }}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              status={errors.title ? "danger" : "basic"}
            />
          )}
        />
        {errors.title && (
          <Text style={styles.errorText}>{errors.title.message}</Text>
        )}

        <Controller
          name="description"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Descripción"
              style={{ marginVertical: 10 }}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              status={errors.description ? "danger" : "basic"}
            />
          )}
        />
        {errors.description && (
          <Text style={styles.errorText}>{errors.description.message}</Text>
        )}

        <Controller
          name="dueDate"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Datepicker
              date={value}
              onSelect={(nextDate) => onChange(nextDate)}
              style={{ marginVertical: 10 }}
              status={errors.dueDate ? "danger" : "basic"}
            />
          )}
        />
        {errors.dueDate && (
          <Text style={styles.errorText}>Debes seleccionar una fecha.</Text>
        )}

        <Controller
          name="isItPaid"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Toggle
              style={styles.toggle}
              status="primary"
              checked={value}
              onChange={onChange}
            >
              ¿Está pagado?
            </Toggle>
          )}
        />
      </Layout>

      <Button style={styles.createButton} onPress={handleSubmit(onSubmit)}>
        {reminder ? "Actualizar" : "Crear"}
      </Button>
    </LayoutWithTopNavigation>
  );
};

export default ReminderForm;

const styles = StyleSheet.create({
  toggle: {
    margin: 2,
  },
  createButton: {
    position: "absolute",
    bottom: 0,
    width: "120%",
    alignSelf: "center",
    marginBottom: 0,
    paddingVertical: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
