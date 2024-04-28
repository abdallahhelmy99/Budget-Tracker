import { Injectable } from '@angular/core';

/**
 * Service for managing session storage.
 * Provides methods to save, retrieve and clear data in session storage.
 * Checks if session storage is available before trying to use it.
 */
@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  /**
   * Saves a value in session storage under the specified key.
   * @param key - The key under which the value should be stored.
   * @param value - The value to be stored.
   */
  save(key: string, value: string) {
    if (this.isSessionStorageAvailable()) {
      sessionStorage.setItem(key, value);
    }
  }

  /**
   * Retrieves a value from session storage by its key.
   * @param key - The key of the value to be retrieved.
   * @returns The retrieved value, or null if session storage is not available or the key does not exist.
   */
  get(key: string): string | null {
    if (this.isSessionStorageAvailable()) {
      return sessionStorage.getItem(key);
    }
    return null;
  }

  /**
   * Retrieves the user's UID from session storage.
   * @returns The user's UID, or null if session storage is not available or the UID does not exist.
   */
  getUid(): string | null {
    return this.get('uid')?.toString() ?? null;
  }

  /**
   * Clears all data from session storage.
   */
  clear() {
    if (this.isSessionStorageAvailable()) {
      sessionStorage.clear();
    }
  }

  /**
   * Checks if session storage is available.
   * Tries to set and remove a test item in session storage.
   * @returns true if session storage is available, false otherwise.
   */
  private isSessionStorageAvailable(): boolean {
    try {
      const testKey = 'test';
      sessionStorage.setItem(testKey, testKey);
      sessionStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }
}
