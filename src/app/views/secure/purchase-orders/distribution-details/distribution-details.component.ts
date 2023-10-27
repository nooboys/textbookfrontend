import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { PurchaseOrdersService } from '../purchase-orders.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/shared/interceptors/error.interceptor';
import { MaterialDistributionDetails } from '../purchase-orders.model';
import { Location } from '@angular/common';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-distribution-details',
  templateUrl: './distribution-details.component.html',
  styleUrls: ['./distribution-details.component.scss'],
})
export class DistributionDetailsComponent implements OnInit, OnDestroy {
  materialDistributionId!: number;
  isLoading = false;
  materialDistributionDetails!: MaterialDistributionDetails;
  modalRef!: BsModalRef;
  private subscriptions = new Subscription();
  backdrop: ModalOptions = {
    backdrop: 'static',
    keyboard: false,
  };

  constructor(
    private poService: PurchaseOrdersService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private modalService: BsModalService,
    private location: Location
  ) {
    const routeParams = this.activatedRoute.snapshot.params;
    this.materialDistributionId = +routeParams['distribution_id'];
  }

  ngOnInit(): void {
    this.getDistributionDetails();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, this.backdrop);
  }

  getDistributionDetails(): void {
    this.isLoading = true;
    const observer = this.poService
      .getMaterialDistributionDetails(this.materialDistributionId)
      .subscribe(
        (response: MaterialDistributionDetails) => {
          this.isLoading = false;
          this.materialDistributionDetails = response;
        },
        (error: ErrorResponse) => {
          this.isLoading = false;
          this.toastrService.error(error.errors[0]);
        }
      );
    this.subscriptions.add(observer);
  }

  onBackToMaterialDistributionsView(): void {
    this.location.back();
  }
}
