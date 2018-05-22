import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { AuthorizationService } from '../../authorization/authorization.service';
import { USER_ROLES } from '../../authorization/models/user-roles';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { UserService } from '../user.service';
import { WaitingIndicatorService } from '../../shared/waiting-indicator/waiting-indicator.service';
import { UserEditDialogComponent } from '../user-edit-dialog/user-edit-dialog.component';

@Component({
  selector: 'app-user-personal-info',
  templateUrl: './user-personal-info.component.html',
  styleUrls: ['./user-personal-info.component.scss']
})
export class UserPersonalInfoComponent implements OnInit {
  @Input() user;
  DEFAULT_PHOTO_URL = '/assets/images/unknown.png';
  isAdmin: boolean;

  constructor(
    public authorizationService: AuthorizationService,
    private dialog: MatDialog,
    private userService: UserService,
    private waitingIndicator: WaitingIndicatorService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.isAdmin = this.authorizationService.hasRole(USER_ROLES.ADMIN);
  }

  openEditDialog() {
    this.dialog
      .open(UserEditDialogComponent, {
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

        this.userService.deleteUser(this.user.value.uid).then(() => {
          this.waitingIndicator.disable();
          this.router.navigate(['students']);
          this.snackBar.open('Student was successfully deleted', null, {
            duration: 2000,
          });
        });
      });
  }
}
