import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

import { StorageService } from './storage.service';

interface UserInfo {
    email: string;
    password: string;
}

@Injectable()
export class AuthService {

    constructor(
        private http: HttpClient,
        private router: Router,
        private storageService: StorageService,
    ) {}

    login( email, password) {
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

    signUp(email, password) {
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
        }

        this.storageService.setUser(userInfo);
    }

    isAuthorized() {
        return !!this.storageService.getUser();
    }
}

