import { Category } from "@/src/domain/entities/category.entity";
import { CategoryRepository } from "@/src/domain/repositories/category.repository";
import * as SQLite from "expo-sqlite";

export class CategoryRepositoryImpl implements CategoryRepository {
  private db: SQLite.SQLiteDatabase =
    SQLite.openDatabaseSync("MissGastosDataBase");

  async getCategoryById(id: number): Promise<Category | null> {
    const category = await this.db.getFirstAsync<Category>(
      "SELECT * FROM Category WHERE id = ?",
      [id]
    );
    if (!category) {
      return null;
    }

    return category;
  }

  async createCategory(category: Omit<Category, "id">): Promise<Category> {
    const { type, icon, color } = category;
    const newCategory = await this.db.runAsync(
      "INSERT INTO Category (type, icon, color) VALUES (?,?,?)",
      type,
      icon,
      color
    );
    return {
      id: newCategory.lastInsertRowId,
      ...category,
    };
  }

  async updateCategory(
    id: number,
    category: Partial<Category>
  ): Promise<Category> {
    const fieldsToUpdate: string[] = [];
    const values: any[] = [];

    if (category.type !== undefined) {
      fieldsToUpdate.push("type = ?");
      values.push(category.type);
    }

    if (category.color !== undefined) {
      fieldsToUpdate.push("color = ?");
      values.push(category.color);
    }

    if (category.icon !== undefined) {
      fieldsToUpdate.push("icon = ?");
      values.push(category.icon);
    }

    const setClause = fieldsToUpdate.join(", ");
    values.push(id);

    if (setClause.length > 0) {
      await this.db.runAsync(
        `UPDATE Category SET ${setClause} WHERE id = ?`,
        ...values
      );
    }
    const updatedCategory = await this.getCategoryById(id);
    if (!updatedCategory) {
      throw new Error("Category not found after update");
    }

    return updatedCategory;
  }

  async deleteCategory(id: number): Promise<void> {
    try {
      await this.db.runAsync("DELETE FROM Category WHERE id = $id", {
        $id: id,
      });
      return;
    } catch (error) {
      throw new Error("Category doesn't exist");
    }
  }

  async getAllCategories(): Promise<Category[]> {
    const categories = await this.db.getAllAsync<Category>(
      "SELECT * FROM Category;"
    );
    return categories;
  }
}
