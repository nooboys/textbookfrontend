import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseOrdersListComponent } from './purchase-orders-list/purchase-orders-list.component';
import { POViewComponent } from './purchase-order-view/po-view.component';
import { POMaterialViewComponent } from './po-material-view/po-material-view.component';
import { DistributionDetailsComponent } from './distribution-details/distribution-details.component';

const routes: Routes = [
  {
    path: 'purchase_orders',
    component: PurchaseOrdersListComponent,
  },
  {
    path: 'purchase_orders/view/:id',
    component: POViewComponent,
  },
  {
    path: 'purchase_orders/view/:po_id/:material_id',
    component: POMaterialViewComponent,
  },
  {
    path: 'purchase_orders/view/:po_id/:material_id/:distribution_id',
    component: DistributionDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchaseOrdersRoutingModule {}
