import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthorizationService } from '../authorization.service';
import { MatSnackBar } from '@angular/material';

import { UtilsService } from '../../shared/services/utils.service';
import { ValidatorService } from '../../shared/services/validator.service';
import { USER_ROLES } from '../models/user-roles';
import { COURSES } from '../models/courses';
import { User } from '../models/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  loading = new BehaviorSubject(false);
  uploadingPhoto = new BehaviorSubject(false);
  DEFAULT_PHOTO_URL = '/assets/images/unknown.png';
  USER_ROLES = USER_ROLES;
  COURSES = COURSES;
  errorMessage: string;

  constructor(
    private authorizationService: AuthorizationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private utilsService: UtilsService,
    private validatorService: ValidatorService,
    private snackBar: MatSnackBar,
  ) {
    this.createForm();
  }

  private createForm(): void {
    this.registrationForm = this.formBuilder.group({
      photoUrl: [''],
      firstName: ['', this.validatorService.required],
      lastName: ['', this.validatorService.required],
      middleName: [''],
      email: ['', [this.validatorService.email, this.validatorService.required] ],
      dateOfBirth: [''],
      phoneNumber: [''],
      role: ['', this.validatorService.required],
      course: ['', this.validatorService.required],
      group: ['', this.validatorService.required],
      additionalInfo: [''],
      password: ['', this.validatorService.required],
    });

    this.registrationForm.valueChanges.subscribe(() => {
      this.errorMessage = '';
    });
  }

  submit(user) {
    this.loading.next(true);

    const newUser = this.utilsService.trim(user);

    if (newUser.role === USER_ROLES.STUDENT) {
      const uid = (new Date()).valueOf();

      this.saveUserToDB(newUser, { uid });

      return;
    }

    this.authorizationService
      .createUser(newUser)
      .then(
        this.saveUserToDB.bind(this, newUser),
        error => {
          this.loading.next(false);
          this.errorMessage = error.message;
        }
      );
  }

  saveUserToDB(user: User, { uid }) {
    this.authorizationService
      .saveUserToDB(uid, user)
      .then(() => {
        this.loading.next(false);
        this.router.navigate(['dashboard']);
        this.snackBar.open('User was successfully created', null, {
          duration: 2000,
        });
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
        this.uploadingPhoto.next(false);
        this.registrationForm.controls['photoUrl'].setValue(snapshot.downloadURL);
      });
  }
}
