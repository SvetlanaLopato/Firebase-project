import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentsComponent } from './students/students.component';
import { AuthGuard } from '../shared/guards/auth-guard.service';
import { StudentDetailsComponent } from './student-details/student-details.component';

const routes: Routes = [
  { path: 'students', component: StudentsComponent, canActivate: [AuthGuard], data: { hasSidebar: true } },
  { path: 'students/:id', component: StudentDetailsComponent, canActivate: [AuthGuard], data: { hasSidebar: true } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
