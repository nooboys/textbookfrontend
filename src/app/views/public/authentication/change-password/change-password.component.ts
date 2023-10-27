import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  changePasswordMismatchValidator,
  confirmPasswordMismatchValidator,
} from 'src/app/shared/validators/change-password.validator';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ChangePwdRequestParams } from '../authentication.model';
import { ErrorResponse } from 'src/app/shared/interceptors/error.interceptor';
import { AuthenticationService } from '../authentication.service';
import { passwordValidator } from 'src/app/shared/components/validators/password-validators';

@Component({
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  changePwdForm!: FormGroup;
  isShowCurrentPassword = false;
  isShowNewPassword = false;
  isShowConfirmPassword = false;
  subscriptions = new Subscription();
  isLoading = false;
  hasValidationError = false;
  validationErrors!: string[];

  constructor(
    private formBuilder: FormBuilder,
    private toasterService: ToastrService,
    private authService: AuthenticationService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.changePwdForm = this.formBuilder.group(
      {
        currentPassword: ['', [Validators.required]],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            passwordValidator.bind(this),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [
          confirmPasswordMismatchValidator('newPassword', 'confirmPassword'),
          changePasswordMismatchValidator('currentPassword', 'newPassword'),
        ],
      }
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  changeCurrentPasswordInput(): void {
    this.isShowCurrentPassword = !this.isShowCurrentPassword;
  }

  changeNewPasswordInput(): void {
    this.isShowNewPassword = !this.isShowNewPassword;
  }

  changeConfirmPasswordInput(): void {
    this.isShowConfirmPassword = !this.isShowConfirmPassword;
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.changePwdForm.controls;
  }

  onChangePwd(): void {
    if (this.changePwdForm.valid) {
      this.isLoading = true;
      this.hasValidationError = false;
      const params: ChangePwdRequestParams = {
        current_password: this.changePwdForm.value.currentPassword,
        new_password: this.changePwdForm.value.newPassword,
        confirm_password: this.changePwdForm.value.confirmPassword,
      };
      const observer = this.authService.changePassword(params).subscribe(
        () => {
          this.isLoading = false;
          this.onLogOut();
          this.toasterService.success(
            'Password has been changed successfully. Login with new credentials'
          );
        },
        (error: ErrorResponse) => {
          this.isLoading = false;
          this.toasterService.error(error.errors[0]);
        }
      );
      this.subscriptions.add(observer);
    }
  }

  onLogOut(): void {
    const observer = this.authService.logout().subscribe(() => {
      this.toasterService.success('You have been logged out successfully');
    });
    this.subscriptions.add(observer);
  }

  onBack(): void {
    this.location.back();
  }
}
