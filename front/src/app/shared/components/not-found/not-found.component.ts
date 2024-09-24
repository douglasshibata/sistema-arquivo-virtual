import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  count = signal(5);
  router = inject(Router);
  constructor() {
    this.startCountdown();
  }

  startCountdown() {
    const intervalId = setInterval(() => {
      this.count.update(value => {
        if (value > 0) {
          return value - 1;
        } else {
          clearInterval(intervalId);
          this.onCountdownFinish();
          return value;
        }
      });
    }, 1000);
  }

  onCountdownFinish() {
    this.router.navigate([''])
  }
}
