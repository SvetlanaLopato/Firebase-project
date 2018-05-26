import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material';

import { STUDENT_SUBJECT_COLUMNS } from './student-subject-columns';
import { GridOptions } from '../../shared/models/grid';
import { StudentAddSubjectDialogComponent } from '../student-add-subject-dialog/student-add-subject-dialog.component';

@Component({
  selector: 'app-student-subjects',
  templateUrl: './student-subjects.component.html',
  styleUrls: ['./student-subjects.component.scss']
})
export class StudentSubjectsComponent implements OnInit {
  @Input() user;
  columns = STUDENT_SUBJECT_COLUMNS;
  subjects = new BehaviorSubject([]);
  gridOptions: GridOptions;

  constructor(
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.gridOptions = {
      actions: {
        delete: this.deleteSubject.bind(this),
        edit: this.editSubject.bind(this),
      },
    };

    this.subjects.next([{
      title: 'Math',
      hours: 123,
      semester: 4,
      controlType: 'exam',
      mark: 12,
      passIdentificator: true,
      teachers: ['Svetlana Ivanonva'],
      edit: true,
    }]);
  }

  deleteSubject() {}

  editSubject() {}

  addSubject() {
    this.dialog
      .open(StudentAddSubjectDialogComponent, {
        width: '788px',
      })
      .afterClosed()
      .subscribe();
  }
}
