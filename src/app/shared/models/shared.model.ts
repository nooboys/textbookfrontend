export interface SuccessMessage {
  message: string;
}
export interface Pagination {
  end_at: number;
  start_at: number;
  per_page: number;
  next_page: number;
  prev_page: number;
  total_count: number;
  total_pages: number;
  current_page: number;
  is_last_page: boolean;
  is_first_page: boolean;
}

export interface NgSelectSearchEvent {
  term: string;
  items: any[];
}

export interface Sorting {
  key: string | undefined;
  type: OrderTypes | undefined;
}

export type OrderType = OrderTypes.ascending | OrderTypes.descending;

export enum OrderTypes {
  ascending = 'asc',
  descending = 'desc',
}

export interface DefaultState {
  pagination: Pagination;
}
export interface NamesAndIds {
  id: number;
  name: string;
}
