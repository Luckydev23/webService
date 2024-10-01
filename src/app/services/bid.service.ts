import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACKEND_URL } from '../../constant/config';

@Injectable({
  providedIn: 'root',
})
export class BidService {
  constructor(private http: HttpClient) {}

  createBidAPI(data: any): Observable<any> {
    return this.http.post(`${BACKEND_URL}/createBid`, data);
  }

  getBidHistoryAPI(userId: any): Observable<any> {
    return this.http.get(`${BACKEND_URL}/getBidHistory/${userId}`);
  }
}
