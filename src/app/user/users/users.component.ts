import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';

import { USER_COLUMNS } from './user-columns';
import { UserService } from '../user.service';
import { WaitingIndicatorService } from '../../shared/waiting-indicator/waiting-indicator.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[];
  dataSource = new MatTableDataSource<any>();
  columns = USER_COLUMNS;
  users = new BehaviorSubject([]);

  constructor(
    private userService: UserService,
    private waitingIndicator: WaitingIndicatorService,
  ) {}

  ngOnInit() {
    this.waitingIndicator.enable();

    this.userService
      .getUsers()
      .then(users => {
        this.waitingIndicator.disable();
        this.users.next(users);
      });
  }

}
