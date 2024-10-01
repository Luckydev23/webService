import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { calculateTime } from '../../../utils';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() data: any;
  remainingTime: number = 0;
  private intervalId: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.remainingTime = this.data.remainTime;
    this.intervalId = setInterval(() => {
      this.remainingTime -= 1;
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  handleBidClick(): void {
    this.router.navigate([`/webservice/brand/${this.data.id}`]);
  }

  calculateTime(time: number): string {
    return calculateTime(time);
  }
}
