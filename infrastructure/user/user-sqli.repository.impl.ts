import { migrateDbIfNeeded } from "@/db/migration";
import { User } from "@/domain/entities/user.entity";
import { UserRepository } from "@/domain/repositories/user.repository";
import * as SQLite from "expo-sqlite";

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

  async createUser(user: User): Promise<User> {
    const { name, globalLimitBudget, profilePictureUrl } = user;
    const result = await this.db.runAsync(
      "INSERT INTO User (name, profilePictureUrl, globalLimitBudget) VALUES (?, ?, ?)",
      name,
      profilePictureUrl,
      globalLimitBudget
    );

    return { ...user };
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

    const updatedUser: User = {
      id: currentUser.id,
      name: user.name ?? "",
      profilePictureUrl: user.profilePictureUrl ?? "",
      globalLimitBudget: user.globalLimitBudget ?? 0,
    };

    return updatedUser;
  }
}
