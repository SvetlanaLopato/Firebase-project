import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpInterceptorService } from './http-interceptor.service';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginGuard } from './guards/login-guard.service';
import { AuthGuard } from './guards/auth-guard.service';
import { SharedRoutingModule } from './shared-routing.module';
import { FormBuilder } from '@angular/forms';
import { ValidatorService } from './services/validator.service';
import { WaitingIndicatorComponent } from './waiting-indicator/waiting-indicator.component';
import { WaitingIndicatorService } from './waiting-indicator/waiting-indicator.service';
import { AppMaterialModule } from '../app-material.module';
import { UtilsService } from './services/utils.service';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule,
    AppMaterialModule,
  ],
  declarations: [
    ProfileComponent,
    PageNotFoundComponent,
    WaitingIndicatorComponent,
    SidebarComponent,
  ],
  exports: [
    WaitingIndicatorComponent,
    SidebarComponent,
  ],
  providers: [
    HttpInterceptorService,
    LoginGuard,
    AuthGuard,
    ValidatorService,
    WaitingIndicatorService,
    UtilsService,
  ],
})
export class SharedModule { }
