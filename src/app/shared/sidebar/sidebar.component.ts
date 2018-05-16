import { Component, OnInit } from '@angular/core';

import { AuthorizationService } from '../../authorization/authorization.service';
import { User } from '../../authorization/models/user';

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
}
