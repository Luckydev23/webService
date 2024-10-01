import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-password-input',
  standalone: true,
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.css'],
})
export class PasswordInputComponent {
  @Input() value: string = '';
  @Input() icon: string = '';
  @Input() placeholder: string = '';
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  isPassword: boolean = true;

  onInputChange(event: any): void {
    this.valueChange.emit(event.target.value);
  }

  togglePasswordVisibility(): void {
    this.isPassword = !this.isPassword;
  }
}
