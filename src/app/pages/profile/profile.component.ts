import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BidService } from '../../services/bid.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { CommonInputComponent } from '../../components/common-input/common-input.component';
import { PasswordInputComponent } from '../../components/password-input/password-input.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonInputComponent, CommonModule, PasswordInputComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  bidHistory: any[] = [];
  isExistedCredit = false;
  userId = '';

  fullNameError: string = '';
  userNameError: string = '';
  emailError: string = '';
  passwordError: string = '';

  constructor(
    private authService: AuthService,
    private bidService: BidService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('token') || '';
    this.initializeForm();
    if (this.userId) {
      this.getUserInfo();
      this.getBidHistory();
    }
  }

  initializeForm(): void {
    this.profileForm = this.fb.group({
      fullName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      cardNum: [''],
      expDate: [''],
      cvc: [''],
    });
  }

  getValue(event: Event) {
    return (event.target as HTMLInputElement).value;
  }

  getUserInfo(): void {
    this.authService.getUserInfoAPI(this.userId).subscribe((res: any) => {
      this.profileForm.patchValue({
        fullName: res.data.fullName,
        userName: res.data.userName,
        email: res.data.email,
        password: res.data.password,
        cardNum: res.data.cardNum,
        expDate: res.data.expDate,
        cvc: res.data.cvc,
      });
    });
  }

  getBidHistory(): void {
    this.bidService.getBidHistoryAPI(this.userId).subscribe((res: any) => {
      this.bidHistory = res.data;
    });
  }

  handleSubmit(): void {
    let isValid = true;

    if (!this.profileForm.controls['fullName'].value) {
      isValid = false;
      this.fullNameError = 'This field is required!';
    } else {
      this.fullNameError = '';
    }

    if (!this.profileForm.controls['userName'].value) {
      isValid = false;
      this.fullNameError = 'This field is required!';
    } else {
      this.fullNameError = '';
    }

    if (!this.profileForm.controls['email'].value) {
      isValid = false;
      this.fullNameError = 'This field is required!';
    } else {
      this.fullNameError = '';
    }

    if (!this.profileForm.controls['password'].value) {
      isValid = false;
      this.fullNameError = 'This field is required!';
    } else {
      this.fullNameError = '';
    }

    if (isValid) {
      const formData = {
        ...this.profileForm.value,
        userId: this.userId,
      };

      this.authService.updateUserInfoAPI(formData).subscribe((res: any) => {
        if (res.status === 'success') {
          this.toastr.success('Profile updated successfully!', 'Success');
        } else {
          this.toastr.error(res.message, 'Error');
        }
      });
    }
  }

  toggleCreditCard(): void {
    this.isExistedCredit = !this.isExistedCredit;
  }
}
