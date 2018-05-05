import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  private tokenTitle = 'user_token';

  getUser(): string {
    return localStorage.getItem(this.tokenTitle);
  }

  setUser(user) {
    const userJSON = JSON.stringify(user);

    localStorage.setItem(this.tokenTitle, userJSON);
  }

  removeUser() {
    localStorage.removeItem(this.tokenTitle);
  }
}
