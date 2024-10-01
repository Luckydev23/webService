import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonInputComponent } from '../common-input/common-input.component';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, CommonInputComponent],
})
export class HeaderComponent implements OnInit {
  sidenavWidth: string = '0%';
  search: string = '';
  isLogin: boolean = false;
  showSidebar: boolean = false;

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkLoginStatus();
      });
  }

  checkLoginStatus(): void {
    const token = localStorage.getItem('token');
    this.isLogin = !!token;
  }

  toggleSidebar(open: boolean): void {
    this.showSidebar = open;
    this.sidenavWidth = open ? '100%' : '0%';
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLogin = false;
    this.router.navigate(['/webservice/login']);
  }

  onSearchChange(event: string): void {
    this.search = event;
  }
}
