import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthorizationRoutingModule } from './authorization-routing.module';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthorizationService } from './authorization.service';
import { StorageService } from './storage.service';

@NgModule({
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
    FormsModule,
  ],
  declarations: [
    LoginComponent,
    SignUpComponent,
  ],
  providers: [
    AuthorizationService,
    StorageService,
  ],
})
export class AuthorizationModule { }
