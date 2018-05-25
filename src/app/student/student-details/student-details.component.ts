import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { Message } from './../../shared/models/message';
import { StudentService } from '../student.service';
import { User } from '../../authorization/models/user';
import { WaitingIndicatorService } from '../../shared/waiting-indicator/waiting-indicator.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {
  user = new BehaviorSubject(null);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService,
    public waitingIndicator: WaitingIndicatorService,
  ) {}

  ngOnInit() {
    const uid = this.route.snapshot.paramMap.get('id');

    this.waitingIndicator.enable();

    this.studentService
      .getUser(uid)
      .then((user: User) => {
        this.waitingIndicator.disable();
        this.user.next(user);
      });
  }

  back() {
    this.router.navigate(['students']);
  }

  addMessage(message: Message) {}
}
