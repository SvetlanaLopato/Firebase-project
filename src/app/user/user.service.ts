import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { NamePipe } from '../shared/pipes/name.pipe';
import { User } from '../authorization/models/user';

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
}
