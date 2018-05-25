import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { NamePipe } from '../shared/pipes/name.pipe';
import { User, UserCredentials } from '../authorization/models/user';

@Injectable()
export class StudentService {
  database = firebase.database();

  constructor(
    private namePipe: NamePipe,
  ) {}

  getUsers() {
    return this.database.ref('students')
      .once('value')
      .then(snapshot => Object.values(snapshot.val()).map((user: User) => ({
        ...user,
        name: this.namePipe.transform(user),
      })));
  }

  getUser(uid: string) {
    return this.database.ref(`students/${uid}`)
      .once('value')
      .then(snapshot => snapshot.val());
  }

  deleteUser(uid: string) {
    return this.database.ref(`students/${uid}`).remove();
  }

  editUser(uid: string, user: User) {
    return this.database.ref(`students/${uid}`).set(user);
  }
}
