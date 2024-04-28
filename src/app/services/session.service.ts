import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private key: string = 'myKey';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  save(value: string) {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(this.key, value);
    } else {
      throw new Error('Session storage not available');
    }
  }

  get(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem(this.key);
    } else {
      throw new Error('Session storage not available');
    }
  }

  clear() {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.clear();
    } else {
      throw new Error('Session storage not available');
    }
  }
}
