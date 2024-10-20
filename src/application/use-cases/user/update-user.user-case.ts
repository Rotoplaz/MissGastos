import { User } from "@/src/domain/entities/user.entity";
import { UserRepository } from "@/src/domain/repositories/user.repository";

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(user: Partial<User>): Promise<User> {
    const userUpdate = await this.userRepository.updateUser(user);
    return userUpdate;
  }
}
