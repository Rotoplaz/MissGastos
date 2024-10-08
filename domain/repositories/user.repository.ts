import { User } from "../entities/user.entity";

export interface UserRepository {
  getUser(): Promise<User | null>;
  createUser(user: User): Promise<User>;
  updateUser(user: Partial<User>): Promise<User | null>;
}
