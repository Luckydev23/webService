import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonInputComponent } from '../../components/common-input/common-input.component';
import { PasswordInputComponent } from '../../components/password-input/password-input.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonInputComponent, PasswordInputComponent, CommonModule],
})
export class RegisterComponent {
  fullName: string = '';
  userName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  cardNum: string = '';
  expDate: string = '';
  cvc: string = '';

  fullNameError: string = '';
  userNameError: string = '';
  emailError: string = '';
  passwordError: string = '';
  confirmPasswordError: string = '';

  emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(
    private authService: AuthService,
    public router: Router,
    private toastr: ToastrService
  ) {}

  getValue(event: Event) {
    return (event.target as HTMLInputElement).value;
  }

  handleSubmit() {
    let isValid = true;

    this.fullNameError = '';
    this.userNameError = '';
    this.emailError = '';
    this.passwordError = '';
    this.confirmPasswordError = '';

    if (!this.fullName) {
      isValid = false;
      this.fullNameError = 'This field is required!';
    }

    if (!this.userName) {
      isValid = false;
      this.userNameError = 'This field is required!';
    }

    if (!this.email) {
      isValid = false;
      this.emailError = 'Invalid email format!';
    } else if (!this.emailRegex.test(this.email)) {
      isValid = false;
      this.emailError = 'This field is required!';
    }

    if (!this.password) {
      isValid = false;
      this.passwordError = 'This field is required!';
    }

    if (this.password !== this.confirmPassword) {
      isValid = false;
      this.confirmPasswordError = 'Passwords do not match!';
    }

    if (isValid) {
      const submitData = {
        fullName: this.fullName,
        userName: this.userName,
        email: this.email,
        password: this.password,
        cardNum: this.cardNum,
        expDate: this.expDate,
        cvc: this.cvc,
      };
      this.authService.registerAPI(submitData).subscribe({
        next: (res) => {
          if (res.status === 'success') {
            this.toastr.success('Registration Successful!', 'Success', {
              positionClass: 'toast-top-right',
            });
            this.router.navigate(['/webservice/login']);
          } else {
            this.toastr.error(res.message, 'Registration Failed', {
              positionClass: 'toast-top-right',
            });
          }
        },
        error: (error) => {
          this.toastr.error('Registration failed. Please try again.', 'Error', {
            positionClass: 'toast-top-right',
          });
          console.error(error);
        },
      });
    }
  }
}
