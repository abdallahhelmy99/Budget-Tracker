import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Category } from '../../models/CategoryModel/category.model';
import { firstValueFrom } from 'rxjs';

/**
 * Service for managing categories.
 * Provides methods for creating, reading, updating, and deleting categories.
 */
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

  /**
   * Creates a new category.
   * @param category - The details of the new category.
   */
  async createCategory(category: Category) {
    await this.db.object(`categories/${category.categoryId}`).set(category);
  }

  /**
   * Retrieves a category by its ID.
   * @param categoryId - The ID of the category to retrieve.
   * @returns The category with the specified ID.
   */
  async getCategory(categoryId: string) {
    const category$ = this.db.object(`categories/${categoryId}`).valueChanges();
    return firstValueFrom(category$);
  }

  /**
   * Updates a category.
   * @param category - The updated details of the category.
   */
  async updateCategory(category: Category) {
    await this.db.object(`categories/${category.categoryId}`).update(category);
  }

  /**
   * Deletes a category.
   * @param categoryId - The ID of the category to delete.
   */
  async deleteCategory(categoryId: string) {
    await this.db.object(`categories/${categoryId}`).remove();
  }
}
