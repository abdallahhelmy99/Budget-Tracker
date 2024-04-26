import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private userSource = new ReplaySubject<any>(1);
  currentUser = this.userSource.asObservable();

  constructor() {}

  setCurrentUser(user: any) {
    console.log('Setting current user:', user);
    this.userSource.next(user);
  }
}
