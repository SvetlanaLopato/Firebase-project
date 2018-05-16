import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { UserCredentials, User } from './models/user';
import { USER_ROLES } from './models/user-roles';

@Injectable()
export class AuthorizationService {
  private tokenTitle = 'information_system_user';

  constructor() {}

  login({ email, password }: UserCredentials) {
    return firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        const token = JSON.stringify({ uid: user.uid });

        localStorage.setItem(this.tokenTitle, token);

        this.getUserFromDB('users');
        this.getUserFromDB('admins');
      });
  }

  private getUserFromDB(dirName: string) {
    const database = firebase.database();
    const { uid } = JSON.parse(localStorage.getItem(this.tokenTitle));

    database.ref(`${dirName}/${uid}`)
        .once('value')
        .then(snapshot => {
            const user = snapshot.val();
            const token = JSON.stringify({ ...user, uid });

            // tslint:disable-next-line:no-unused-expression
            user && localStorage.setItem(this.tokenTitle, token);
        });
  }

  resetPassword(email: string) {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logout() {
    firebase.auth()
      .signOut()
      .then(() => {
        localStorage.removeItem(this.tokenTitle);
      });
  }

  createUser({ email, password }: UserCredentials) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  saveUserToDB(uid: string, user: User) {
    const database: any = firebase.database();
    const folderName = user.role === USER_ROLES.ADMIN ? 'admins' : 'users';

    return database.ref(`${folderName}/${uid}`).set(user);
  }

  isAuthorized(): boolean {
    return !!localStorage.getItem(this.tokenTitle);
  }

  uploadImage(file) {
    const ref = firebase.storage().ref();
    const name = `images/users/${file.name}_${(+new Date())}`;
    const metadata = { contentType: file.type };

    return ref.child(name).put(file, metadata);
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem(this.tokenTitle));
  }
}
