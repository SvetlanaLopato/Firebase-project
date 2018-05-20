import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { AuthGuard } from '../shared/guards/auth-guard.service';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  { path: 'students', component: UsersComponent, canActivate: [AuthGuard], data: { hasSidebar: true } },
  { path: 'students/:id', component: UserDetailsComponent, canActivate: [AuthGuard], data: { hasSidebar: true } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
