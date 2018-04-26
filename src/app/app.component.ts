import { Component } from '@angular/core';

import { AuthorizationService } from './authorization/authorization.service';

import './firebase';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private authorizationService: AuthorizationService) { }
}
