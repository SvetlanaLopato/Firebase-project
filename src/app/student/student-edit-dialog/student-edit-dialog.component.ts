import { Component, ChangeDetectionStrategy, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { ValidatorService } from '../../shared/services/validator.service';
import { USER_ROLES } from '../../authorization/models/user-roles';
import { COURSES } from '../../authorization/models/courses';
import { AuthorizationService } from '../../authorization/authorization.service';
import { WaitingIndicatorService } from '../../shared/waiting-indicator/waiting-indicator.service';
import { User } from '../../authorization/models/user';
import { UtilsService } from '../../shared/services/utils.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './student-edit-dialog.component.html',
  styleUrls: ['./student-edit-dialog.component.scss']
})

export class StudentEditDialogComponent implements OnInit {
  userEditForm: FormGroup;
  DEFAULT_PHOTO_URL = '/assets/images/unknown.png';
  uploadingPhoto = new BehaviorSubject(false);
  USER_ROLES = USER_ROLES;
  COURSES = COURSES;

  constructor(
    public dialogRef: MatDialogRef<StudentEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: any,
    private formBuilder: FormBuilder,
    private validatorService: ValidatorService,
    private studentService: StudentService,
    private waitingIndicator: WaitingIndicatorService,
    private utilsService: UtilsService,
    private authorizationService: AuthorizationService,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.userEditForm = this.formBuilder.group({
      photoUrl: [this.user.photoUrl],
      firstName: [this.user.firstName, this.validatorService.required],
      lastName: [this.user.lastName, this.validatorService.required],
      middleName: [this.user.middleName],
      email: [this.user.email, [this.validatorService.email, this.validatorService.required] ],
      dateOfBirth: [this.user.dateOfBirth],
      phoneNumber: [this.user.phoneNumber],
      role: [this.user.role, this.validatorService.required],
      course: [this.user.course, this.validatorService.required],
      group: [this.user.group, this.validatorService.required],
      additionalInfo: [this.user.additionalInfo],
    });
  }

  uploadPhoto(files: FileList) {
    if (!files[0]) {
      return;
    }

    this.uploadingPhoto.next(true);

    this.authorizationService
      .uploadImage(files[0])
      .then(snapshot => {
        this.userEditForm.controls['photoUrl'].setValue(snapshot.downloadURL);
        this.uploadingPhoto.next(false);
      });
  }

  save(user: User) {
    const updatedUser = Object.assign(this.user, this.utilsService.trim(user));

    this.waitingIndicator.enable();

    this.studentService
      .editUser(this.user.uid, updatedUser)
      .then((data) => {
        this.waitingIndicator.disable();
        this.dialogRef.close(updatedUser);
      });
  }
}
