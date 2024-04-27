import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private userSource = new ReplaySubject<any>(1);
  currentUser = this.userSource.asObservable();

  constructor() {
    if (typeof localStorage !== 'undefined') {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.userSource.next(JSON.parse(storedUser));
      }
    }
  }

  setCurrentUser(user: any) {
    console.log('Setting current user:', user.name);
    this.userSource.next(user);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }
}
