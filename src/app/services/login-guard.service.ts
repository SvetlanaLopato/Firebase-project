import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    canActivate() {
        return !this.authService.isAuthorized();
    }

}
 