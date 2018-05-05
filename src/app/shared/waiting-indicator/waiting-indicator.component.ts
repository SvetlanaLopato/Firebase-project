import { Component } from '@angular/core';
import { WaitingIndicatorService } from './waiting-indicator.service';


@Component({
  selector: 'app-waiting-indicator',
  templateUrl: './waiting-indicator.component.html',
  styleUrls: ['./waiting-indicator.component.scss'],
})
export class WaitingIndicatorComponent {
  constructor(public waitingIndicator: WaitingIndicatorService) {}
}
