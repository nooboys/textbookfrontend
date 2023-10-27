import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { REGEX_PATTERNS } from 'src/app/shared/constants/constants';
import { ErrorResponse } from 'src/app/shared/interceptors/error.interceptor';
import { UserResponse } from '../authentication.model';
import { AuthenticationService } from '../authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup;
  subscriptions = new Subscription();
  errors: string[] = [];
  isLoading = false;
  isShowPassword = true;

  constructor(
    formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private toasterService: ToastrService,
    private router: Router
  ) {
    this.loginForm = formBuilder.group({
      email: [
        null,
        [Validators.required, Validators.pattern(REGEX_PATTERNS.email)],
      ],
      password: [null, Validators.required],
    });
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  passwordIconToggle(): void {
    this.isShowPassword = !this.isShowPassword;
  }

  login(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const userCredentials = this.loginForm.value;
      const observer = this.authenticationService
        .login(userCredentials)
        .subscribe(
          (user: HttpResponse<UserResponse>) => {
            this.isLoading = false;
            this.router.navigateByUrl('purchase_orders');
            this.toasterService.success('Login Successful');
          },
          (error: ErrorResponse) => {
            this.isLoading = false;
            this.toasterService.error(error.errors[0]);
          }
        );
      this.subscriptions.add(observer);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
