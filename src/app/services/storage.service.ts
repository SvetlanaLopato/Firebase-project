import { Injectable } from '@angular/core';

const tokenTitle = 'user_token';

@Injectable()
export class StorageService {
    getUser() {
        return localStorage.getItem(tokenTitle)
    }

    setUser(user) {
        const userJSON = JSON.stringify(user);

        localStorage.setItem(tokenTitle, userJSON);
    }

    removeUser() {
        localStorage.removeItem(tokenTitle);
    }

}
