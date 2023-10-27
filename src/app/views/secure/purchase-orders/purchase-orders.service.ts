import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import {
  DownloadPO,
  MaterialDistributionDetails,
  POMaterialDistribution,
  PurchaseOrder,
  PurchaseOrders,
} from './purchase-orders.model';
import { environment } from 'src/environments/environment';
import { AppState } from 'src/app/app.reducer';
import { Store, select } from '@ngrx/store';
import { selectPOState } from './store/po.selector';

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrdersService {
  constructor(private http: HttpClient, private store: Store<AppState>) {}
  readonly apiUrl = environment.apiUrl;

  getAllPO(): Observable<PurchaseOrders> {
    let params = new HttpParams();
    this.store.pipe(select(selectPOState), take(1)).subscribe((POState) => {
      params = params.appendAll({
        page: POState.pagination.current_page.toString(),
        q: POState.searchTerm ? POState.searchTerm : '',
      });
      if (POState.poStatus !== 'All') {
        params = params.append('status', POState.poStatus);
      }
    });
    return this.http.get<PurchaseOrders>(
      `${this.apiUrl}/v1/admins/purchase_orders`,
      { params }
    );
  }

  getPODetials(id: number): Observable<PurchaseOrder> {
    return this.http.get<PurchaseOrder>(
      `${this.apiUrl}/v1/admins/purchase_orders/${id}`
    );
  }

  downloadPoDetails(): Observable<DownloadPO> {
    return this.http.get<DownloadPO>(
      `${this.apiUrl}/v1/purchase_orders/downloads`
    );
  }

  getMaterialDistributionList(
    poId: number,
    materialId: number
  ): Observable<POMaterialDistribution> {
    return this.http.get<POMaterialDistribution>(
      `${this.apiUrl}/v1/purchase_orders/${poId}/materials/${materialId}/material_distributions`
    );
  }

  getMaterialDistributionDetails(
    materialId: number
  ): Observable<MaterialDistributionDetails> {
    return this.http.get<MaterialDistributionDetails>(
      `${this.apiUrl}/v1/material_distributions/${materialId}`
    );
  }
}
