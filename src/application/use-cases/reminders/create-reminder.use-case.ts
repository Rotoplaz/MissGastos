import { Reminder } from "@/src/domain/entities/reminders.entity";
import { RemindersRepository } from "@/src/domain/repositories/reminders.repository";

export class CreateReminderUseCase {
  constructor(private readonly remindersRepository: RemindersRepository) {}

  async execute(reminder: Omit<Reminder, "id">): Promise<Reminder> {
    const newRemainder = await this.remindersRepository.createReminder(
      reminder
    );
    return newRemainder;
  }
}
