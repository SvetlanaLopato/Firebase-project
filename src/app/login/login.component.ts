import { Component } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    private email: string;
    private password: string;
    private error: string;

    constructor(private authService: AuthService) {}

    login() {
        this.authService
            .login(this.email, this.password)
            .catch(error => {
                this.error = error.message;
            });
    }
}
