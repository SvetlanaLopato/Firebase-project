import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthorizationService } from '../../authorization/authorization.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private authorizationService: AuthorizationService,
    private router: Router,
  ) {}

  canActivate() {
    if (this.authorizationService.isAuthorized()) {
      this.router.navigate(['dashboard']);

      return false;
    }

    return true;
  }
}
