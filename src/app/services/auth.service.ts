import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACKEND_URL } from '../../constant/config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  registerAPI(data: any): Observable<any> {
    return this.http.post(`${BACKEND_URL}/register`, data);
  }

  loginAPI(data: any): Observable<any> {
    return this.http.post(`${BACKEND_URL}/login`, data);
  }

  updateUserInfoAPI(data: any): Observable<any> {
    return this.http.post(`${BACKEND_URL}/updateUserInfo`, data);
  }

  getUserInfoAPI(userId: string): Observable<any> {
    return this.http.get(`${BACKEND_URL}/getUserInfo/${userId}`);
  }
}
