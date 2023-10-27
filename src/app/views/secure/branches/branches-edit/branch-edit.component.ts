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
import { BranchService } from '../branches.service';
import { AddBranch, BranchForm } from '../branches.model';
import { ErrorResponse } from 'src/app/shared/interceptors/error.interceptor';
import { FormStateService } from 'src/app/shared/services/form-state.service';
import { REGEX_PATTERNS } from 'src/app/shared/constants/constants';
import { BranchesList } from '../../users/users.model';

@Component({
  templateUrl: './branch-edit.component.html',
})
export class EditBranchComponent implements OnInit, OnDestroy {
  editBranchForm!: FormGroup;
  isLoading!: boolean;
  hasValidationError!: boolean;
  validationErrors!: string[];
  hasBranch!: boolean;
  initialLoading!: boolean;
  districtNamesList: BranchesList[] = [];
  private subscriptions = new Subscription();
  private branchId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toasterService: ToastrService,
    private branchService: BranchService,
    private formState: FormStateService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.branchId = this.route.snapshot.params['id'];
    this.getUserAndInitializeForm();
    const observer = this.branchService
      .getDistrictNames()
      .subscribe((response) => {
        this.districtNamesList = response;
      });
    this.subscriptions.add(observer);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  initializeForm(): void {
    this.editBranchForm = this.formBuilder.group({
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      address: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(200),
          Validators.pattern(REGEX_PATTERNS.whiteSpace),
        ],
      ],
      dl_type: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(30),
          Validators.pattern(REGEX_PATTERNS.whiteSpace),
        ],
      ],
      district_id: [null, [Validators.required]],
    });
  }

  private getUserAndInitializeForm(): void {
    const observer = this.branchService
      .getBranchDetails(this.branchId)
      .subscribe(
        (branch: AddBranch) => {
          this.editBranchForm.patchValue({
            name: branch.name,
            address: branch.address,
            dl_type: branch.dl_type,
            district_id: branch.district_id,
          });
          this.hasBranch = true;
          this.initialLoading = false;
          this.formState.isFormPristine(this.editBranchForm);
        },
        (error: ErrorResponse) => {
          this.toasterService.error(error.errors[0]);
          this.hasBranch = false;
          this.initialLoading = false;
        }
      );
    this.subscriptions.add(observer);
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.editBranchForm.controls;
  }

  onFormSubmit(): void {
    if (this.editBranchForm.valid) {
      this.isLoading = true;
      const branches: BranchForm = {
        name: this.editBranchForm.value.name,
        address: this.editBranchForm.value.address.trim(),
        dl_type: this.editBranchForm.value.dl_type.trim(),
        district_id: this.editBranchForm.value.district_id,
      };

      const observer = this.branchService
        .updateBranch(branches, this.branchId)
        .subscribe(
          () => {
            this.toasterService.success('Branch edited successfully');
            this.router.navigate(['/branches']);
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
