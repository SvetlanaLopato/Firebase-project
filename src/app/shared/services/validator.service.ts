import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable()
export class ValidatorService {
  constructor() {}

  required(control: AbstractControl): { required: boolean } {
    if (typeof control.value === 'string' && !control.value.trim()) {
      return { required: true };
    }

    return null;
  }

  email(control: AbstractControl): { email: boolean } {
    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!EMAIL_REGEX.test(control.value)) {
      return { email: true };
    }

    return null;
  }

  passwordEqual(control: AbstractControl): { passwordEqual: boolean } {
    const password: string = control.parent && control.parent.get('password').value;
    const passwordRepeat: string = control.value;

    if (password !== passwordRepeat) {
      return { passwordEqual: true };
    }

    return null;
  }
}
