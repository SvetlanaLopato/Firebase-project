import { Component } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
    private email: string;
    private password: string;
    private error: string;

    constructor(private authService: AuthService) {}

    signUp() {
        this.authService
            .signUp(this.email, this.password)
            .catch(error => {
                this.error = error.message;
            });
    }

}
