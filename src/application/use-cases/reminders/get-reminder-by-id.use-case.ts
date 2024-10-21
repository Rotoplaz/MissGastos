import { Reminder } from "@/src/domain/entities/reminders.entity";
import { RemindersRepository } from "@/src/domain/repositories/reminders.repository";

export class GetReminderByIdUseCase {
  constructor(private readonly remindersRepository: RemindersRepository) {}

  async execute(id: number): Promise<Reminder | null> {
    const reminder = await this.remindersRepository.getReminderById(id);

    return reminder;
  }
}
