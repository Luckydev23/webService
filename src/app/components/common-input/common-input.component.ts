import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-common-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './common-input.component.html',
  styleUrls: ['./common-input.component.css'],
})
export class CommonInputComponent {
  @Input() value: string = '';
  @Input() icon: string = '';
  @Input() placeholder: string = '';
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  onInputChange(event: any): void {
    this.valueChange.emit(event.target.value);
  }
}
