import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import './firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  hasSidebar: boolean;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router
      .events
      .subscribe(event => {
        if (event instanceof ActivationEnd) {
          this.hasSidebar = event.snapshot.data.hasSidebar;
        }
      });
  }
}
