import { User } from "@/src/domain/entities/user.entity";
import { UserRepository } from "@/src/domain/repositories/user.repository";

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(user: User): Promise<User> {
    const newUser = await this.userRepository.createUser(user);
    return newUser;
  }
}
