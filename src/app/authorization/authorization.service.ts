import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { StorageService } from './storage.service';

@Injectable()
export class AuthorizationService {
    constructor(
        private storageService: StorageService,
    ) {}

    login(email: string, password: string) {
        return firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(data => {
                this.saveUser(data);
            });
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

