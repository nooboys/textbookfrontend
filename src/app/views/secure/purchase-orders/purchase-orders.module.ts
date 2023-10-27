import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseOrdersListComponent } from './purchase-orders-list/purchase-orders-list.component';
import { PurchaseOrdersRoutingModule } from './purchase-orders.routing.module';
import { IconModule } from '@coreui/icons-angular';
import { ButtonModule } from '@coreui/angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../../shared/shared.module';
import { POViewComponent } from './purchase-order-view/po-view.component';
import { POMaterialViewComponent } from './po-material-view/po-material-view.component';
import { DistributionDetailsComponent } from './distribution-details/distribution-details.component';

@NgModule({
  declarations: [
    PurchaseOrdersListComponent,
    POViewComponent,
    POMaterialViewComponent,
    DistributionDetailsComponent,
  ],
  imports: [
    CommonModule,
    PurchaseOrdersRoutingModule,
    IconModule,
    SharedModule,
    ButtonModule,
    NgSelectModule,
  ],
})
export class PurchaseOrdersModule {}
