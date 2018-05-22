import { Component, OnInit } from '@angular/core';

import { AuthorizationService } from '../../authorization/authorization.service';
import { User } from '../../authorization/models/user';
import { USER_ROLES } from '../../authorization/models/user-roles';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  DEFAULT_PHOTO_URL = '/assets/images/unknown.png';
  isMenuOpen: false;
  user: User;

  constructor(
    public authorizationService: AuthorizationService,
  ) {}

  ngOnInit() {
    this.user = this.authorizationService.getUser();
  }

  isAdmin() {
    return this.authorizationService.hasRole(USER_ROLES.ADMIN);
  }
}
