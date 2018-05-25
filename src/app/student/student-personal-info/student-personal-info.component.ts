import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { AuthorizationService } from '../../authorization/authorization.service';
import { USER_ROLES } from '../../authorization/models/user-roles';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { StudentService } from '../student.service';
import { WaitingIndicatorService } from '../../shared/waiting-indicator/waiting-indicator.service';
import { StudentEditDialogComponent } from '../student-edit-dialog/student-edit-dialog.component';

@Component({
  selector: 'app-user-personal-info',
  templateUrl: './student-personal-info.component.html',
  styleUrls: ['./student-personal-info.component.scss']
})
export class StudentPersonalInfoComponent implements OnInit {
  @Input() user;
  DEFAULT_PHOTO_URL = '/assets/images/unknown.png';
  isAdmin: boolean;

  constructor(
    public authorizationService: AuthorizationService,
    private dialog: MatDialog,
    private studentService: StudentService,
    private waitingIndicator: WaitingIndicatorService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.isAdmin = this.authorizationService.hasRole(USER_ROLES.ADMIN);
  }

  openEditDialog() {
    this.dialog
      .open(StudentEditDialogComponent, {
        width: '788px',
        data: {...this.user.value},
      })
      .afterClosed()
      .subscribe(updatedUser => {
        updatedUser && this.user.next(updatedUser);
      });
  }

  deleteUser() {
    this.dialog
      .open(ConfirmationDialogComponent, {
        width: '626px',
        data: {
          title: 'Delete student',
          question: 'Are you sure you want to delete student?',
          action: 'delete',
        },
      })
      .afterClosed()
      .subscribe(({ confirmed } = {}) => {
        if (!confirmed) {
          return;
        }

        this.waitingIndicator.enable();

        this.studentService.deleteUser(this.user.value.uid).then(() => {
          this.waitingIndicator.disable();
          this.router.navigate(['students']);
          this.snackBar.open('Student was successfully deleted', null, {
            duration: 2000,
          });
        });
      });
  }
}
