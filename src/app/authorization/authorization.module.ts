import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthorizationRoutingModule } from './authorization-routing.module';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthorizationService } from './authorization.service';
import { StorageService } from './storage.service';
import { AppMaterialModule } from '../app-material.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordSuccessComponent } from './reset-password-success/reset-password-success.component';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
  ],
  declarations: [
    LoginComponent,
    SignUpComponent,
    ResetPasswordComponent,
    ResetPasswordSuccessComponent,
    RegistrationComponent,
  ],
  providers: [
    AuthorizationService,
    StorageService,
  ],
})
export class AuthorizationModule { }
