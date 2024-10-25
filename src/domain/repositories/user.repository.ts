import { CreateUserDto } from "@/src/application/dtos/create-user.dto";
import { User } from "../entities/user.entity";

export interface UserRepository {
  getUser(): Promise<User | null>;
  createUser(user: CreateUserDto): Promise<User>;
  updateUser(user: Partial<User>): Promise<User>;
}
