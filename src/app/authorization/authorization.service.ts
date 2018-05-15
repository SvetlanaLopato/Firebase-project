import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { StorageService } from './storage.service';
import { UserCredentials, User } from './models/user';
import { USER_ROLES } from './models/user-roles';

@Injectable()
export class AuthorizationService {
  constructor(
    private storageService: StorageService,
  ) {}

  login({ email, password }: UserCredentials) {
    return firebase.auth()
      .signInWithEmailAndPassword(email, password);
  }

  resetPassword(email: string) {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logout() {
    firebase.auth()
      .signOut()
      .then(() => {
        this.storageService.removeUser();
      });
  }

  createUser({ email, password }: UserCredentials) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  saveUser(uid: string, user: User) {
    const database: any = firebase.database();
    const folderName = user.role === USER_ROLES.ADMIN ? 'admins' : 'users';

    return database.ref(`${folderName}/${uid}`).set(user);
  }

  isAuthorized(): boolean {
    return !!this.storageService.getUser();
  }

  uploadImage(file) {
    const ref = firebase.storage().ref();
    const name = `images/users/${file.name}_${(+new Date())}`;
    const metadata = { contentType: file.type };

    return ref.child(name).put(file, metadata);
  }
}
