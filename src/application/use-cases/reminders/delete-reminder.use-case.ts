import { RemindersRepository } from "@/src/domain/repositories/reminders.repository";

export class DeleteReminderUseCase {
  constructor(private readonly remindersRepository: RemindersRepository) {}

  async execute(id: number): Promise<void> {
    await this.remindersRepository.deleteReminder(id);
  }
}
