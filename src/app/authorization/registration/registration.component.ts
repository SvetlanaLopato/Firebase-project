import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthorizationService } from '../authorization.service';

import { UtilsService } from '../../shared/services/utils.service';
import { ValidatorService } from '../../shared/services/validator.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  loading = new BehaviorSubject(false);

  constructor(
    private authorizationService: AuthorizationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private utilsService: UtilsService,
    private validatorService: ValidatorService,
  ) {
    this.createForm();
  }

  private createForm(): void {
    this.registrationForm = this.formBuilder.group({});
  }

  submit(user) {
    console.log(user);
  }
}
