import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { AuthorizationService } from '../authorization.service';
import { ValidatorService } from '../../shared/services/validator.service';
import { UserCredentials } from '../models/user';
import { UtilsService } from '../../shared/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  isPasswordVisible = false;
  isErrorVisible = false;

  constructor(
    private authorizationService: AuthorizationService,
    private formBuilder: FormBuilder,
    private validatorService: ValidatorService,
    private utilsService: UtilsService,
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [this.validatorService.required, this.validatorService.email]],
      password: ['', this.validatorService.required],
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.isErrorVisible = false;
    });
  }

  login({ email, password }: UserCredentials) {
    this.loading = true;

    this.authorizationService
      .login(this.utilsService.trim({ email, password }))
      .then(
        () => {
          this.loading = false;
        },
        error => {
          this.isErrorVisible = true;
          this.loading = false;
        }
      );
  }
}
