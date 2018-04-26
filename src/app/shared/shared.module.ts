import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpInterceptorService } from './http-interceptor.service';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginGuard } from './guards/login-guard.service';
import { AuthGuard } from './guards/auth-guard.service';
import { SharedRoutingModule } from './shared-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule,
  ],
  declarations: [
    ProfileComponent,
    PageNotFoundComponent,
  ],
  providers: [
    HttpInterceptorService,
    LoginGuard,
    AuthGuard,
  ],
})
export class SharedModule { }
