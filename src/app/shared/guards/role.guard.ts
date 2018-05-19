import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthorizationService } from '../../authorization/authorization.service';
import { USER_ROLES } from '../../authorization/models/user-roles';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private authorizationService: AuthorizationService,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const isAdmin = this.authorizationService.hasRole(USER_ROLES.ADMIN);

    if (!route.data.onlyForAdmin || isAdmin) {
      return true;
    }

    this.router.navigate(['not-found']);

    return false;
  }
}
