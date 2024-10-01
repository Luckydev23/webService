import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  { path: 'webservice', component: HomeComponent },
  { path: 'webservice/brand/:id', component: DetailComponent },
  { path: 'webservice/register', component: RegisterComponent },
  { path: 'webservice/login', component: LoginComponent },
  { path: 'webservice/profile', component: ProfileComponent },
  { path: '', redirectTo: '/webservice', pathMatch: 'full' },
];
