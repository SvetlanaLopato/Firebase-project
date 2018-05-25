import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash';

import { User } from '../../authorization/models/user';
import { ValidatorService } from '../services/validator.service';
import { Message } from '../models/message';
import { AuthorizationService } from '../../authorization/authorization.service';
import { UtilsService } from '../services/utils.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-user-message',
  templateUrl: './user-message.component.html',
  styleUrls: ['./user-message.component.scss']
})
export class UserMessageComponent implements OnInit {
  @Input() user: Observable<User>;
  messageForm: FormGroup;
  messages = [{
    from: 'test@adznaka.by',
    to: 'aa@example.com',
    subject: 'Subject',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electr',
  }, {
    from: 'test@adznaka.by',
    to: 'aa@example.com',
    subject: 'Subject',
    text: 'Hello',
  }]

  constructor(
    private formBuilder: FormBuilder,
    private validatorService: ValidatorService,
    private authorizationService: AuthorizationService,
    private utilsServie: UtilsService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.user.subscribe(user => {
      const currentUser = this.authorizationService.getUser();

      this.initMessageForm(currentUser.email, user.email);
    });
  }

  private initMessageForm(from: string, to: string) {
    this.messageForm = this.formBuilder.group({
      from: [{ value: from, disabled: true }],
      to: [{ value: to, disabled: true }],
      subject: [''],
      text: ['', this.validatorService.required],
      sendToUser: [false],
      sendToSystem: [false],
    });
  }

  send() {
    const controls = this.messageForm.controls;
    const value: any = Object.keys(controls).reduce((accumulator, messageField: string) => {
      accumulator[messageField] = controls[messageField].value;

      return accumulator;
    }, {});
    const message: any = this.utilsServie.trim(_.pick(value, ['from', 'to', 'subject', 'text']));

    // value.sendToUser && this.messageService.sendMessage(message);
    // value.sendToSystem && this.studentService.addMessage(message);
  }

  sendMessageAvailable() {
    return this.messageForm.valid
      && (this.messageForm.controls['sendToUser'].value || this.messageForm.controls['sendToSystem'].value);
  }
}
