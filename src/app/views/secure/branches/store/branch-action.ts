import { createAction, props } from '@ngrx/store';
import { Pagination } from 'src/app/shared/models/shared.model';

export const actionSetBranchesPagination = createAction(
  '[Branches] Update Page',
  props<{ pagination: Pagination }>()
);
