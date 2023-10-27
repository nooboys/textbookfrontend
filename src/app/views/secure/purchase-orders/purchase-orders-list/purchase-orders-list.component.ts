import { Component, OnInit, OnDestroy } from '@angular/core';
import { PurchaseOrdersService } from '../purchase-orders.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/shared/interceptors/error.interceptor';
import { DownloadPO, PurchaseOrder } from '../purchase-orders.model';
import { Pagination } from 'src/app/shared/models/shared.model';
import { Store } from '@ngrx/store';
import { selectPOState } from '../store/po.selector';
import { AppState } from 'src/app/app.reducer';
import {
  actionSetPOListCurrentPage,
  actionSetPoListSearchTerm,
  actionSetPoPagination,
  actionSetPoStatus,
} from '../store/po.action';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-purchase-orders-list',
  templateUrl: './purchase-orders-list.component.html',
  styleUrls: ['./purchase-orders-list.component.scss'],
})
export class PurchaseOrdersListComponent implements OnInit, OnDestroy {
  poList: PurchaseOrder[] = [];
  pagination!: Pagination;
  isLoading = false;
  searchKeyWord = '';
  selectedPOStatus!: string;
  onSearchKeyWordChange = new Subject<string>();
  serialNo!: number;
  isPODownloading = false;
  private subscriptions = new Subscription();

  constructor(
    private poService: PurchaseOrdersService,
    private toastrService: ToastrService,
    private store: Store<AppState>,
    private router: Router
  ) {
    const observer = this.store.select(selectPOState).subscribe((response) => {
      this.pagination = response.pagination;
      this.searchKeyWord = response.searchTerm;
      this.selectedPOStatus = response.poStatus;
    });
    this.subscriptions.add(observer);

    this.onSearchKeyWordChange
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((searchValue) => {
        this.store.dispatch(
          actionSetPoListSearchTerm({ searchTerm: searchValue })
        );
        this.onPageChange(1);
      });
  }

  ngOnInit(): void {
    this.getAllPO();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getAllPO(): void {
    this.isLoading = true;
    const observer = this.poService.getAllPO().subscribe(
      (response) => {
        this.isLoading = false;
        this.poList = response.purchase_orders;
        this.store.dispatch(
          actionSetPoPagination({ pagination: response.pagination })
        );
        this.serialNo = this.pagination.start_at;
      },
      (error: ErrorResponse) => {
        this.isLoading = false;
        this.toastrService.error(error.errors[0]);
      }
    );
    this.subscriptions.add(observer);
  }

  onPageChange(page: number): void {
    this.store.dispatch(actionSetPOListCurrentPage({ current_page: page }));
    this.getAllPO();
  }

  onView(id: number) {
    this.router.navigateByUrl(`purchase_orders/view/${id}`);
  }

  onFilterPOStatus() {
    this.store.dispatch(actionSetPoStatus({ poStatus: this.selectedPOStatus }));
    this.onPageChange(1);
  }

  onDownloadPoDetails(): void {
    this.isPODownloading = true;
    const observer = this.poService.downloadPoDetails().subscribe(
      (response: DownloadPO) => {
        const link = document.createElement('a');
        link.href = response.url;
        link.click();
        window.URL.revokeObjectURL(link.href);
        link.remove();
        this.isPODownloading = false;
      },
      (error: ErrorResponse) => {
        this.toastrService.error(error.errors[0]);
        this.isPODownloading = false;
      }
    );
    this.subscriptions.add(observer);
  }
}
