import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class WaitingIndicatorService {
  private active = new BehaviorSubject(false);

  enable() {
    this.active.next(true);
  }

  disable() {
    this.active.next(false);
  }

  isActivated() {
    return this.active;
  }
}
