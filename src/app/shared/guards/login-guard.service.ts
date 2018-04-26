import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthorizationService } from '../../authorization/authorization.service';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(
        private authorizationService: AuthorizationService,
    ) {}

    canActivate() {
        return !this.authorizationService.isAuthorized();
    }
}
