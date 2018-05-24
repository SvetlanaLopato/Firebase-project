import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

import { Message } from '../models/message';

@Injectable()
export class MessageService {
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
  ) {}

  sendMessage(message: Message) {
    this.http.post('/api/mail', message).subscribe(() => {
      this.snackBar.open('Message was successfully sent', null, {
        duration: 2000,
      });
    });
  }
}
