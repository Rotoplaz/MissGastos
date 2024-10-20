import { Reminder } from "@/src/domain/entities/reminders.entity";
import { RemindersRepository } from "@/src/domain/repositories/reminders.repository";

export class GetAllRemindersUseCase {
  constructor(private readonly remindersRepository: RemindersRepository) {}

  async execute(): Promise<Reminder[]> {
    const reminders = await this.remindersRepository.getAllReminders();
    return reminders;
  }
}
