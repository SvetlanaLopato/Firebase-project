import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { NamePipe } from '../shared/pipes/name.pipe';
import { User, UserCredentials } from '../authorization/models/user';

@Injectable()
export class UserService {
  database = firebase.database();

  constructor(
    private namePipe: NamePipe,
  ) {}

  getUsers() {
    return this.database.ref('users')
      .once('value')
      .then(snapshot => Object.values(snapshot.val()).map((user: User) => ({
        ...user,
        name: this.namePipe.transform(user),
      })));
  }

  getUser(uid: string) {
    return this.database.ref(`users/${uid}`)
      .once('value')
      .then(snapshot => snapshot.val());
  }

  deleteUser(uid: string) {
    return this.database.ref(`users/${uid}`).remove();
  }

  editUser(uid: string, user: User) {
    return this.database.ref(`users/${uid}`).set(user);
  }
}
