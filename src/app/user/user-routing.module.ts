import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { AuthGuard } from '../shared/guards/auth-guard.service';

const routes: Routes = [
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard], data: { hasSidebar: true } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
