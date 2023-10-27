import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ForgotPwdRequestParams } from '../authentication.model';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/shared/interceptors/error.interceptor';
import { AuthenticationService } from '../authentication.service';
import { REGEX_PATTERNS } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  isPasswordResetLinkSend = false;
  forgotPasswordForm!: FormGroup;
  lastUsedEmailId!: string;
  subscriptions = new Subscription();
  isLoading!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    public toasterService: ToastrService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: [
        null,
        [Validators.required, Validators.pattern(REGEX_PATTERNS.email)],
      ],
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get email(): AbstractControl | null {
    return this.forgotPasswordForm.get('email');
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      this.isLoading = true;
      const params: ForgotPwdRequestParams = {
        email: this.email!.value,
      };
      const observer = this.authService.forgotPassword(params).subscribe(
        () => {
          this.isPasswordResetLinkSend = true;
          this.lastUsedEmailId = this.email!.value;
          this.isLoading = false;
        },
        (error: ErrorResponse) => {
          this.toasterService.error(error.errors[0]);
          this.isLoading = false;
          this.isPasswordResetLinkSend = false;
        }
      );
      this.subscriptions.add(observer);
    }
  }
}
