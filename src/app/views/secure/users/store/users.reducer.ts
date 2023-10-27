import { createReducer, on } from '@ngrx/store';
import { UserState } from '../users.model';
import { actionSetUsersPagination } from './users.action';

const initialState: UserState = {
  pagination: {
    end_at: 0,
    start_at: 0,
    per_page: 0,
    next_page: 0,
    prev_page: 0,
    total_count: 1,
    total_pages: 1,
    current_page: 1,
    is_last_page: true,
    is_first_page: true,
  },
};

export const userReducer = createReducer(
  initialState,
  on(actionSetUsersPagination, (state, props) => ({
    ...state,
    pagination: props.pagination,
  }))
);
