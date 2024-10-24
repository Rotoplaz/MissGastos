import { User } from "../entities/user.entity";

export interface UserRepository {
  getUser(): Promise<User | null>;
  createUser(user: Omit<User, "id">): Promise<User>;
  updateUser(user: Partial<User>): Promise<User>;
}
