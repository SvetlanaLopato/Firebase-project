import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { UserService } from '../user.service';
import { User } from '../../authorization/models/user';
import { WaitingIndicatorService } from '../../shared/waiting-indicator/waiting-indicator.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user = new BehaviorSubject(null);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    public waitingIndicator: WaitingIndicatorService,
  ) {}

  ngOnInit() {
    const uid = this.route.snapshot.paramMap.get('id');

    this.waitingIndicator.enable();

    this.userService
      .getUser(uid)
      .then((user: User) => {
        this.waitingIndicator.disable();
        this.user.next(user);
      });
  }

  back() {
    this.router.navigate(['students']);
  }
}
