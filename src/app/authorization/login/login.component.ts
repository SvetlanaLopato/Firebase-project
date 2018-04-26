import { Component } from '@angular/core';

import { AuthorizationService } from '../authorization.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    private email: string;
    private password: string;
    private error: string;

    constructor(private authorizationService: AuthorizationService) {}

    login() {
        this.authorizationService
            .login(this.email, this.password)
            .catch(error => {
                this.error = error.message;
            });
    }
}
