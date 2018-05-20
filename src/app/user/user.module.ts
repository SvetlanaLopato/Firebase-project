import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { AppMaterialModule } from '../app-material.module';
import { UsersComponent } from './users/users.component';
import { UserService } from './user.service';
import { SharedModule } from '../shared/shared.module';
import { NamePipe } from '../shared/pipes/name.pipe';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SharedModule,
  ],
  declarations: [
    UsersComponent
  ],
  providers: [
    UserService,
    NamePipe,
  ],
})
export class UserModule {}
