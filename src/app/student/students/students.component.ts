import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';

import { USER_COLUMNS } from './student-columns';
import { UserService } from '../student.service';
import { WaitingIndicatorService } from '../../shared/waiting-indicator/waiting-indicator.service';

@Component({
  selector: 'app-users',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  displayedColumns: string[];
  dataSource = new MatTableDataSource<any>();
  columns = USER_COLUMNS;
  users = new BehaviorSubject([]);

  constructor(
    private userService: UserService,
    private waitingIndicator: WaitingIndicatorService,
    private router: Router,
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

  goToDetails(id: string) {
    this.router.navigate(['/students', id]);
  }
}
