import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginGuard } from '../shared/guards/login-guard.service';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordSuccessComponent } from './reset-password-success/reset-password-success.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { path: 'reset-password-success', component: ResetPasswordSuccessComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'reset-password', component: ResetPasswordComponent, canActivate: [LoginGuard] },
  { path: 'registration', component: RegistrationComponent, canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorizationRoutingModule {}
