import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StudentRoutingModule } from './student-routing.module';
import { AppMaterialModule } from '../app-material.module';
import { StudentsComponent } from './students/students.component';
import { UserService } from './student.service';
import { SharedModule } from '../shared/shared.module';
import { NamePipe } from '../shared/pipes/name.pipe';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentPersonalInfoComponent } from './student-personal-info/student-personal-info.component';
import { StudentEditDialogComponent } from './student-edit-dialog/student-edit-dialog.component';
import { StudentSubjectsComponent } from './student-subjects/student-subjects.component';

@NgModule({
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SharedModule,
  ],
  declarations: [
    StudentsComponent,
    StudentDetailsComponent,
    StudentPersonalInfoComponent,
    StudentEditDialogComponent,
    StudentSubjectsComponent
  ],
  providers: [
    UserService,
    NamePipe,
  ],
  entryComponents: [StudentEditDialogComponent],
})
export class StudentModule {}
