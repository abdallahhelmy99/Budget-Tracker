// firebase.service.ts
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { catchError, map, take } from 'rxjs/operators';
import { UserDataService } from './userdata.service';
import { UserModel } from '../models/UserModel/user.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    private db: AngularFireDatabase,
    private userDataService: UserDataService
  ) {}

  login(username: string, password: string) {
    return this.db
      .list<UserModel>('users', (ref) =>
        ref.orderByChild('username').equalTo(username).limitToFirst(1)
      )
      .valueChanges()
      .pipe(
        take(1),
        map((users) => {
          const user = users.find(
            (user: UserModel) => user.password === password
          );
          if (user) {
            sessionStorage.setItem('userid', user.userid.toString());
            return user;
          } else {
            throw new Error('Invalid username or password');
          }
        }),
        catchError((error) => {
          console.error('Error in login method:', error);
          throw error;
        })
      );
  }

  register(name: string, username: string, password: string) {
    return this.db
      .list('users')
      .valueChanges()
      .pipe(
        take(1),
        map((users) => {
          const maxId = Math.max(...users.map((user: any) => user.userid), 0);
          const newId = maxId + 1;
          return this.db
            .list('users')
            .set(newId.toString(), { userid: newId, name, username, password });
        })
      );
  }

  getUserById(userid: number) {
    return this.db
      .list<UserModel>('users', (ref) =>
        ref.orderByChild('userid').equalTo(userid).limitToFirst(1)
      )
      .valueChanges()
      .pipe(
        take(1),
        map((users) => {
          return users[0];
        })
      );
  }

  updateUserBalance(userid: number, newBalance: number) {
    return this.db
      .list<UserModel>('users', (ref) =>
        ref.orderByChild('userid').equalTo(userid).limitToFirst(1)
      )
      .valueChanges()
      .pipe(
        take(1),
        map((users) => {
          const user = users[0];
          if (user) {
            user.balance = newBalance;
            return this.db.list('users').set(user.userid.toString(), user);
          } else {
            throw new Error('User not found');
          }
        })
      );
  }
}
