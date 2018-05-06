import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { get } from 'lodash';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ValidatorService } from '../../shared/services/validator.service';
import { AuthorizationService } from '../authorization.service';
import { UtilsService } from '../../shared/services/utils.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  loading = false;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private validatorService: ValidatorService,
    private router: Router,
    private authorizationService: AuthorizationService,
    private utilsService: UtilsService,
  ) {}

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [this.validatorService.required, this.validatorService.email] ],
    });

    this.resetPasswordForm.valueChanges.subscribe(() => {
      this.errorMessage = null;
    });
  }

  reset(data) {
    const { email } = this.utilsService.trim(data);

    this.loading = true;

    this.authorizationService
      .resetPassword(email)
      .then(
        () => {
          this.loading = false;
          this.router.navigate(['reset-password-success']);
        },
        error => {
          this.loading = false;
          this.errorMessage = error.message;
        },
      );
  }

}
