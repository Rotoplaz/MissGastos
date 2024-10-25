
import { User } from "@/src/domain/entities/user.entity";
import { UserRepository } from "@/src/domain/repositories/user.repository";
import * as SQLite from "expo-sqlite";
import { migrateDbIfNeeded } from "../db/migration";

export class UserRepositorySqliteImpl implements UserRepository {
  private db: SQLite.SQLiteDatabase =
    SQLite.openDatabaseSync("MissGastosDataBase");

  constructor() {
    migrateDbIfNeeded(this.db);
  }

  async getUser(): Promise<User | null> {
    const user = await this.db.getFirstAsync<User>("SELECT * FROM User");

    if (!user) {
      return null;
    }
    
    return user;
  }

  async createUser(user: Omit<User, "id">): Promise<User> {
    const { name, globalLimitBudget, profilePictureUrl } = user;
    const result = await this.db.runAsync(
      "INSERT INTO User (name, profilePictureUrl, globalLimitBudget) VALUES (?, ?, ?)",
      name,
      profilePictureUrl,
      globalLimitBudget
    );
    
    return { ...user, id: result.lastInsertRowId };
  }

  async updateUser(user: Partial<User>): Promise<User> {
    const updates: string[] = [];
    const values: (string | number)[] = [];
    const currentUser = await this.getUser();

    if (!currentUser) {
      throw new Error("user not found");
    }

    if (user.name !== undefined) {
      updates.push("name = ?");
      values.push(user.name);
    }

    if (user.profilePictureUrl !== undefined) {
      updates.push("profilePictureUrl = ?");
      values.push(user.profilePictureUrl);
    }

    if (user.globalLimitBudget !== undefined) {
      updates.push("globalLimitBudget = ?");
      values.push(user.globalLimitBudget);
    }

    values.push(currentUser.id);

    const query = `UPDATE User SET ${updates.join(", ")} WHERE id = ?`;
    
    await this.db.runAsync(query, ...values);

    const userUpdated = await this.getUser();
    
    if( ! userUpdated ) throw new Error("Usuario no encontrado");

    return userUpdated;
  }
}
