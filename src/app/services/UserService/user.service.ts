import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { User } from '../../models/UserModel/user.model';
import { Observable, from, switchMap } from 'rxjs';
import { AuthService } from '../AuthService/auth.service';

/**
 * Service for managing users.
 * Provides methods for creating, reading, updating, and deleting users.
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  /**
   * Creates a new user.
   * @param user - The details of the new user.
   */
  async createUser(user: User) {
    await this.db.object(`users/${user.userid}`).set(user);
  }

  /**
   * Retrieves a user.
   * @returns The user or null if not found.
   */

  getUser(): Observable<User | null> {
    return from(this.authService.getCurrentUserId()).pipe(
      switchMap((userId) =>
        this.db.object<User>(`users/${userId}`).valueChanges()
      )
    );
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
