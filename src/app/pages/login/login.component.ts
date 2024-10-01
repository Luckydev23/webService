import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonInputComponent } from '../../components/common-input/common-input.component';
import { PasswordInputComponent } from '../../components/password-input/password-input.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { config } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonInputComponent,
    PasswordInputComponent,
    CommonModule,
    HttpClientModule,
  ],
})
export class LoginComponent {
  userName: string = '';
  password: string = '';
  userNameError: string = '';
  passwordError: string = '';

  constructor(
    private authService: AuthService,
    public router: Router,
    private toastr: ToastrService
  ) {}

  handleSubmit(): void {
    let isValid = true;

    if (!this.userName) {
      isValid = false;
      this.userNameError = 'This field is required!';
    } else {
      this.userNameError = '';
    }

    if (!this.password) {
      isValid = false;
      this.passwordError = 'This field is required!';
    } else {
      this.passwordError = '';
    }

    if (isValid) {
      const submitData = {
        userName: this.userName,
        password: this.password,
      };

      this.authService.loginAPI(submitData).subscribe({
        next: (res) => {
          if (res.status === 'success') {
            this.toastr.success('Success!', 'Login Successful');
            localStorage.setItem('token', res.data.id.toString());
            this.router.navigate(['/webservice']);
          } else {
            this.toastr.error(res.message, 'Error');
          }
        },
        error: () => {
          this.toastr.error('An error occurred. Please try again.', 'Error');
        },
      });
    }
  }
}
