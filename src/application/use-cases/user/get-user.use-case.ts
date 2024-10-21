import { User } from "@/src/domain/entities/user.entity";
import { UserRepository } from "@/src/domain/repositories/user.repository";

export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<User | null> {
    const user = await this.userRepository.getUser();
    return user;
  }
}
