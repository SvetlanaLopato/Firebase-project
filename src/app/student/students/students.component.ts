import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';

import { STUDENT_COLUMNS } from './student-columns';
import { StudentService } from '../student.service';
import { WaitingIndicatorService } from '../../shared/waiting-indicator/waiting-indicator.service';
import { GridOptions } from '../../shared/models/grid';

@Component({
  selector: 'app-users',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  displayedColumns: string[];
  dataSource = new MatTableDataSource<any>();
  columns = STUDENT_COLUMNS;
  users = new BehaviorSubject([]);
  gridOptions: GridOptions;

  constructor(
    private studentService: StudentService,
    private waitingIndicator: WaitingIndicatorService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.gridOptions = {
      isSearchAvailable: true,
      isFilterAvailable: true,
      clickableRow: true,
    };

    this.waitingIndicator.enable();

    this.studentService
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
