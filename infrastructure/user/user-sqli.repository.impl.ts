import { User } from "@/domain/entities/user.entity";
import { UserRepository } from "@/domain/repositories/user.repository";
import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from "react-native-sqlite-storage";
enablePromise(true);

const tableName = "user";

export class UserSqliImpl implements UserRepository {
  getUser(): Promise<User> {
    throw new Error("Method not implemented.");
  }
  createUser(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  updateUser(id: number, user: Partial<User>): Promise<User> {
    throw new Error("Method not implemented.");
  }
}

export const getDBConnection = async () => {
  return openDatabase({ name: "database.sql", location: "default" });
};
