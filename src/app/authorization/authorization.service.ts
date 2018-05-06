import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { StorageService } from './storage.service';
import { UserCredentials } from './models/user';

@Injectable()
export class AuthorizationService {
  constructor(
    private storageService: StorageService,
  ) {}

  login({ email, password }: UserCredentials) {
    return firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        this.saveUser(data);
      });
  }

  resetPassword(email: string) {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logout() {
    firebase.auth()
      .signOut()
      .then(() => {
        this.storageService.removeUser();
      })
      .catch(error => {
        console.log(error.message);
      });
  }

  signUp(email: string, password: string) {
    return firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        this.saveUser(data);
      });
  }

  saveUser(data) {
    const userInfo = {
      email: data.email,
      token: data.refreshToken,
    };

    this.storageService.setUser(userInfo);
  }

  isAuthorized(): boolean {
    return !!this.storageService.getUser();
  }
}
