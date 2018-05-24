import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpInterceptorService } from './http-interceptor.service';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginGuard } from './guards/login-guard.service';
import { AuthGuard } from './guards/auth-guard.service';
import { SharedRoutingModule } from './shared-routing.module';
import { ValidatorService } from './services/validator.service';
import { WaitingIndicatorComponent } from './waiting-indicator/waiting-indicator.component';
import { WaitingIndicatorService } from './waiting-indicator/waiting-indicator.service';
import { AppMaterialModule } from '../app-material.module';
import { UtilsService } from './services/utils.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NamePipe } from './pipes/name.pipe';
import { RoleGuard } from './guards/role.guard';
import { GridComponent } from './grid/grid.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MessageService } from './services/message.service';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ProfileComponent,
    PageNotFoundComponent,
    WaitingIndicatorComponent,
    SidebarComponent,
    NamePipe,
    GridComponent,
    ConfirmationDialogComponent,
  ],
  exports: [
    WaitingIndicatorComponent,
    SidebarComponent,
    GridComponent,
  ],
  providers: [
    HttpInterceptorService,
    LoginGuard,
    AuthGuard,
    RoleGuard,
    ValidatorService,
    WaitingIndicatorService,
    UtilsService,
    MessageService,
  ],
  entryComponents: [ConfirmationDialogComponent],
})
export class SharedModule { }
