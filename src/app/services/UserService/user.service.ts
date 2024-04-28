import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { User } from '../../models/UserModel/user.model';
import { firstValueFrom } from 'rxjs';

/**
 * Service for managing users.
 * Provides methods for creating, reading, updating, and deleting users.
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFireDatabase) {}

  /**
   * Creates a new user.
   * @param user - The details of the new user.
   */
  async createUser(user: User) {
    await this.db.object(`users/${user.userid}`).set(user);
  }

  /**
   * Retrieves a user by their ID.
   * @param userId - The ID of the user to retrieve.
   * @returns The user with the specified ID.
   */
  async getUser(userId: string) {
    const user$ = this.db.object(`users/${userId}`).valueChanges();
    return firstValueFrom(user$);
  }

  /**
   * Updates a user.
   * @param user - The updated details of the user.
   */
  async updateUser(user: User) {
    await this.db.object(`users/${user.userid}`).update(user);
  }

  /**
   * Deletes a user.
   * @param userId - The ID of the user to delete.
   */
  async deleteUser(userId: string) {
    await this.db.object(`users/${userId}`).remove();
  }
}
