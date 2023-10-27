import { createReducer, on } from '@ngrx/store';
import { BranchState } from '../branches.model';
import { actionSetBranchesPagination } from './branch-action';

const initialState: BranchState = {
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

export const branchReducer = createReducer(
  initialState,
  on(actionSetBranchesPagination, (state, props) => ({
    ...state,
    pagination: props.pagination,
  }))
);
