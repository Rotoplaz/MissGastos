import { User } from "@/domain/entities/user.entity";
import { UserRepository } from "@/domain/repositories/user.repository";
import * as SQLite from "expo-sqlite";

export class UserRepositoryImpl implements UserRepository {
  private db: SQLite.SQLiteDatabase = SQLite.openDatabaseSync("databaseName");
  constructor() {
    this.db.execAsync(
      `CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      profilePictureUrl TEXT,
      globalLimitBudget REAL);`
    );
  }
  async getUser(): Promise<User | null> {
    const user = await this.db.getFirstAsync<User>("SELECT * FROM User");
    // Verificar si se encontró un usuario
    if (!user) {
      return null;
    }
    return user;
  }
  async createUser(user: User): Promise<User> {
    const name = user.name;
    const profePic = user.profilePictureUrl;
    const budget = user.globalLimitBudget;
    const result = await this.db.runAsync(
      "INSERT INTO user (name, profilePictureUrl, globalLimitBudget) VALUES (?, ?, ?)",
      name,
      profePic,
      budget
    );
    return { ...user };
  }
  async updateUser(user: Partial<User>): Promise<User | null> {
    // Construir la parte de SET de la consulta
    const updates: string[] = [];
    const values: (string | number)[] = [];
    const currentUser = await this.getUser();
    if (!currentUser) {
      throw new Error("user not found");
    }
    // Solo agregar campos que se deben actualizar
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

    // Agregar el ID al final de los valores
    values.push(currentUser.id);

    // Construir la consulta SQL
    const query = `UPDATE user SET ${updates.join(", ")} WHERE id = ?`;

    // Ejecutar la consulta
    await this.db.runAsync(query, ...values);

    // Crear un nuevo objeto User con los valores actualizados
    const updatedUser: User = {
      id: currentUser.id,
      name: user.name ?? "", // Proporciona un valor por defecto si es undefined
      profilePictureUrl: user.profilePictureUrl ?? "", // Proporciona un valor por defecto
      globalLimitBudget: user.globalLimitBudget ?? 0, // Proporciona un valor por defecto
    };

    return updatedUser;
  }
}
