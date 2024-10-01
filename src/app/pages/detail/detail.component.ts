import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BidService } from '../../services/bid.service';
import { ToastrService } from 'ngx-toastr';
import { interval, Subscription } from 'rxjs';
import { BRAND_LIST, BIDDING_HISTORY } from '../../../constant/constants';
import { calculateTime } from '../../../utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail',
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'], // equivalent of styles from CSS modules
  standalone: true,
})
export class DetailComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bidService = inject(BidService);
  private toastService = inject(ToastrService);

  biddingHistory = BIDDING_HISTORY;

  data: any = {};
  remainingTime: number | null = null;
  bidPrice: string = '';
  intervalSubscription: Subscription | null = null;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.data = BRAND_LIST.find((item: any) => item.id.toString() === id);

    this.remainingTime = this.data?.remainTime;

    this.intervalSubscription = interval(1000).subscribe(() => {
      if (this.remainingTime !== null && this.remainingTime > 0) {
        this.remainingTime--;
      }
    });
  }

  ngOnDestroy() {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  handleBackClick() {
    this.router.navigate(['/webservice']);
  }

  getValue(event: Event) {
    return (event.target as HTMLInputElement).value;
  }

  handleBid() {
    const submitData = {
      userId: localStorage.getItem('token'),
      price: this.bidPrice,
      image: this.data.image,
      date: new Date().getTime().toString(),
      brandName: this.data.name,
    };

    if (submitData.price && Number(this.bidPrice) > 0) {
      this.bidService.createBidAPI(submitData).subscribe((res: any) => {
        if (res.status === 'success') {
          this.toastService.success('Success!');
          this.router.navigate(['/webservice']);
        } else {
          console.error(res);
          this.toastService.error(res.error);
        }
      });
    }
  }

  calculateTimeLeft() {
    return calculateTime(Number(this.remainingTime));
  }
}
