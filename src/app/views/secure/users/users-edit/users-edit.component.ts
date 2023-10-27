import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserService } from '../users.service';
import { FormStateService } from 'src/app/shared/services/form-state.service';
import { REGEX_PATTERNS } from 'src/app/shared/constants/constants';
import { UserFormEdit, UserResponse } from '../users.model';
import { ErrorResponse } from 'src/app/shared/interceptors/error.interceptor';

@Component({
  templateUrl: './users-edit.component.html',
})
export class EditUserComponent implements OnInit, OnDestroy {
  editUserForm!: FormGroup;
  isLoading!: boolean;
  hasValidationError!: boolean;
  validationErrors!: string[];
  hasUser!: boolean;
  initialLoading = true;
  private userId!: number;
  private subscriptions = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toasterService: ToastrService,
    private userService: UserService,
    private formState: FormStateService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.userId = this.route.snapshot.params['id'];
    this.getUserAndInitializeForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initializeForm(): void {
    this.editUserForm = this.formBuilder.group({
      firstName: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(20),
        ],
      ],
      lastName: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(20),
        ],
      ],
      email: [
        null,
        [Validators.required, Validators.pattern(REGEX_PATTERNS.email)],
      ],
      branch: [null, [Validators.required]],
    });
  }

  private getUserAndInitializeForm(): void {
    const observer = this.userService.getUserDetails(this.userId).subscribe(
      (user: UserResponse) => {
        this.editUserForm.patchValue({
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          branch: user.branch_name,
        });
        this.hasUser = true;
        this.initialLoading = false;
        this.formState.isFormPristine(this.editUserForm);
      },
      (error: ErrorResponse) => {
        this.toasterService.error(error.errors[0]);
        this.hasUser = false;
        this.initialLoading = false;
      }
    );
    this.subscriptions.add(observer);
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.editUserForm.controls;
  }

  onFormUpdate(): void {
    if (this.editUserForm.valid) {
      this.isLoading = true;
      const user: UserFormEdit = {
        first_name: this.editUserForm.value.firstName,
        last_name: this.editUserForm.value.lastName,
      };
      const observer = this.userService.updateUser(user, this.userId).subscribe(
        () => {
          this.toasterService.success('User has been updated successfully');
          this.router.navigate(['/users']);
        },
        (error: ErrorResponse) => {
          this.toasterService.error(error.errors[0]);
        }
      );
      this.subscriptions.add(observer);
    }
  }
}
