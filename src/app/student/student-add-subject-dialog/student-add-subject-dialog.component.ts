import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as _ from 'lodash';

import { ValidatorService } from '../../shared/services/validator.service';
import { User } from '../../authorization/models/user';
import { StudentSubject } from '../models/student-subject';
import { CONTROL_TYPES } from '../../shared/models/control-type';

@Component({
  selector: 'app-student-add-subject-dialog',
  templateUrl: './student-add-subject-dialog.component.html',
  styleUrls: ['./student-add-subject-dialog.component.scss']
})
export class StudentAddSubjectDialogComponent implements OnInit {
  studentSubjectForm: FormGroup;
  CONTROL_TYPES = CONTROL_TYPES;
  teachers: any = [];
  availableTeachers = [{
    uid: '1',
    name: 'Kozlova Elena Ivanovna'
  }, {
    uid: '2',
    name: 'Semenchic'
  }, {
    uid: '3',
    name: 'Popko'
  }];

  constructor(
    public dialogRef: MatDialogRef<StudentAddSubjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public subject: any,
    private formBuilder: FormBuilder,
    private validatorService: ValidatorService,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.studentSubjectForm = this.formBuilder.group({
      title: [_.get(this.subject, 'title'), this.validatorService.required],
      hours: [_.get(this.subject, 'hours')],
      semester: [_.get(this.subject, 'semester'), this.validatorService.required],
      controlType: [_.get(this.subject, 'controlType')],
      mark: [_.get(this.subject, 'mark')],
      passIdentificator: [_.get(this.subject, 'passIdentificator')],
      teachers: []
    });
  }

  save(subject: StudentSubject) {}

  removeTeacher(teacher) {
    _.remove(this.teachers, { uid: teacher.uid });
    this.availableTeachers.push(teacher);
  }

  selectTeacher(event) {
    const teacher = event.option.value;

    _.remove(this.availableTeachers, { uid: teacher.uid });
    this.teachers.push(teacher);
  }
}
