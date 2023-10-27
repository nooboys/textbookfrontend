import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserService } from '../users.service';
import { BranchesList, UserForm } from '../users.model';
import { REGEX_PATTERNS } from 'src/app/shared/constants/constants';
import { ErrorResponse } from 'src/app/shared/interceptors/error.interceptor';

@Component({
  templateUrl: './users-add.component.html',
})
export class AddUserComponent implements OnInit, OnDestroy {
  addUserForm!: FormGroup;
  isLoading!: boolean;
  hasValidationError!: boolean;
  validationErrors!: string[];
  branchesList: BranchesList[] = [];
  private subscriptions = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toasterService: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getBranchNames();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  initializeForm(): void {
    this.addUserForm = this.formBuilder.group({
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

  get formControls(): { [key: string]: AbstractControl } {
    return this.addUserForm.controls;
  }

  getBranchNames(): void {
    const observer = this.userService.getBranchNames().subscribe(
      (response) => {
        this.branchesList = response;
      },
      (error: ErrorResponse) => {
        this.toasterService.error(error.errors[0]);
      }
    );
    this.subscriptions.add(observer);
  }

  onFormSubmit(): void {
    if (this.addUserForm.valid) {
      this.isLoading = true;
      const user: UserForm = {
        first_name: this.addUserForm.value.firstName,
        last_name: this.addUserForm.value.lastName,
        email: this.addUserForm.value.email,
        branch_id: this.addUserForm.value.branch,
      };
      const observer = this.userService.addUser(user).subscribe(
        () => {
          this.toasterService.success('User added successfully');
          this.router.navigate(['/users']);
        },
        (error) => {
          this.toasterService.error(error.errors[0]);
          this.isLoading = false;
        }
      );
      this.subscriptions.add(observer);
    }
  }
}
