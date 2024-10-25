import { User } from "@/src/domain/entities/user.entity";
import { UserRepository } from "@/src/domain/repositories/user.repository";
import { CreateUserDto } from "../../dtos/create-user.dto";

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(user: CreateUserDto): Promise<User> {
    const newUser = await this.userRepository.createUser(user);
    return newUser;
  }
}
