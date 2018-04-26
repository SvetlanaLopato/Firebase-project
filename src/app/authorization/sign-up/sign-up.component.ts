import { Component } from '@angular/core';

import { AuthorizationService } from '../authorization.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
    private email: string;
    private password: string;
    private error: string;

    constructor(private authorizationService: AuthorizationService) {}

    signUp() {
        this.authorizationService
            .signUp(this.email, this.password)
            .catch(error => {
                this.error = error.message;
            });
    }

}
