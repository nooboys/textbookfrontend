import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
})
export class LoadingButtonComponent {
  @Input() disabled = false;
  @Input() buttonClass = 'btn-primary';
  @Input() buttonText?: string;
  @Input() buttonIconClass?: string;
  @Input() isLoading = false;
  @Input() loadingText?: string;
  @Input() hideTextOnSM?: string;
  @Input() title?: string;
  @Output() buttonClick = new EventEmitter();

  click(): void {
    this.buttonClick.emit();
  }
}
