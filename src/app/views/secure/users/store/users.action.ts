import { createAction, props } from '@ngrx/store';
import { Pagination } from 'src/app/shared/models/shared.model';

export const actionSetUsersPagination = createAction(
  '[Users] Update Page',
  props<{ pagination: Pagination }>()
);
