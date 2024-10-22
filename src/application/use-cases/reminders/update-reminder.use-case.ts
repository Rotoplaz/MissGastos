import { Reminder } from "@/src/domain/entities/reminders.entity";
import { RemindersRepository } from "@/src/domain/repositories/reminders.repository";

export class UpdateReminderUseCase {
  constructor(private readonly reminderRepository: RemindersRepository) {}

  async execute(id: number, reminder: Partial<Reminder>): Promise<Reminder> {
    const reminderUpdated = await this.reminderRepository.updateReminder(
      id,
      reminder
    );
    return reminderUpdated;
  }
}
