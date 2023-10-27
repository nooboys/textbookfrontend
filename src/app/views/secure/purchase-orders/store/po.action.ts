import { createAction, props } from '@ngrx/store';
import { Pagination } from 'src/app/shared/models/shared.model';

export const actionSetPoPagination = createAction(
  '[PO] Purchase Orders State',
  props<{ pagination: Pagination }>()
);

export const actionSetPoListSearchTerm = createAction(
  '[PO] Set PO List SearchTerm',
  props<{ searchTerm: string }>()
);

export const actionSetPoStatus = createAction(
  '[PO] Set PO List Search Status',
  props<{ poStatus: string }>()
);

export const actionSetPOListCurrentPage = createAction(
  '[PO] Set PO List current Page',
  props<{ current_page: number }>()
);
