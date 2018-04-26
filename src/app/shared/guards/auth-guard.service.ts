import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthorizationService } from '../../authorization/authorization.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authorizationService: AuthorizationService,
        private router: Router,
    ) {}

    canActivate() {
        return this.authorizationService.isAuthorized();
    }

}
