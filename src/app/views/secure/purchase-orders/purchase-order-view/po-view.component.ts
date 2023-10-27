import { Component, OnDestroy, OnInit } from '@angular/core';
import { PurchaseOrdersService } from '../purchase-orders.service';
import { Material, PurchaseOrder } from '../purchase-orders.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorResponse } from 'src/app/shared/interceptors/error.interceptor';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-po-view',
  templateUrl: './po-view.component.html',
  styleUrls: ['./po-view.component.scss'],
})
export class POViewComponent implements OnInit, OnDestroy {
  purchaseOrder!: PurchaseOrder;
  materialList: Material[] = [];
  poId!: number;
  isLoading = false;
  private subscriptions = new Subscription();

  constructor(
    private poService: PurchaseOrdersService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.poId = +this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getPODetails();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getPODetails(): void {
    this.isLoading = true;
    const observer = this.poService.getPODetials(this.poId).subscribe(
      (response: PurchaseOrder) => {
        this.isLoading = false;
        this.purchaseOrder = response;
        this.materialList = response.Material;
      },
      (error: ErrorResponse) => {
        this.isLoading = false;
        this.toastrService.error(error.errors[0]);
      }
    );
    this.subscriptions.add(observer);
  }

  onBack(): void {
    this.router.navigate(['purchase_orders']);
  }

  onViewMaterialDistribution(poId: number, materialId: number): void {
    this.router.navigate(['purchase_orders/view', poId, materialId]);
  }
}
