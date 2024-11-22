import { User } from "@/src/domain/entities/user.entity";
import { UserRepository } from "@/src/domain/repositories/user.repository";
import { CreateUserDto } from "@/src/application/dtos/create-user.dto";
import { getDataBase } from "../db/database";

export class UserRepositorySqliteImpl implements UserRepository {
  async getUser(): Promise<User | null> {
    const db = await getDataBase();
    const user = await db.getFirstAsync<User>("SELECT * FROM User");

    if (!user) {
      await db.closeAsync();
      return null;
    }
    await db.closeAsync();
    return user;
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const { name, globalLimitBudget, profilePictureUrl } = user;
    const db = await getDataBase();
    const result = await db.runAsync(
      "INSERT INTO User (name, profilePictureUrl, globalLimitBudget) VALUES (?, ?, ?)",
      name,
      profilePictureUrl || "",
      globalLimitBudget
    );
    await db.closeAsync();
    return {
      ...user,
      profilePictureUrl: user.profilePictureUrl || "",
      id: result.lastInsertRowId,
    };
  }

  async updateUser(user: Partial<User>): Promise<User> {
    const db = await getDataBase();
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
    await db.runAsync(query, ...values);

    const userUpdated = await this.getUser();

    if (!userUpdated) {
      await db.closeAsync();
      throw new Error("Usuario no encontrado");
    }
    await db.closeAsync();
    return userUpdated;
  }
}
