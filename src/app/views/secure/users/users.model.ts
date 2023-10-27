import { Pagination, Sorting } from 'src/app/shared/models/shared.model';

export enum SEARCH_TYPES {
  standard = 'STANDARD',
  advance = 'ADVANCED',
}

export interface UserSorting extends Sorting {
  key: UserListSortColumn | undefined;
}

export type UserListSortColumn =
  | UserListSortColumns.id
  | UserListSortColumns.email
  | UserListSortColumns.first_name
  | UserListSortColumns.last_name
  | UserListSortColumns.role
  | UserListSortColumns.branch_id
  | UserListSortColumns.branch_name;

export enum UserListSortColumns {
  id = 'o_id',
  email = 'o_email',
  first_name = 'o_firtName',
  last_name = 'o_lastName',
  role = 'o_role',
  branch_id = 'o_branchid',
  branch_name = 'o_branchName',
}

export type SearchType = SEARCH_TYPES.standard | SEARCH_TYPES.advance;

export interface Users {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  branch_id: string;
  branch_name: string;
  created_at: string;
  updated_at: string;
}

export interface GetUserResponse {
  users: Users[];
  pagination: Pagination;
}

// export interface UserState extends GetUserResponse {
//   search: string;
//   searchType: SearchType;
//   sort: UserSorting;
// }

export interface UserResponse {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  branch_id: string;
  branch_name: string;
  created_at: string;
  updated_at: string;
}

export interface UserForm {
  first_name: string;
  last_name: string;
  email: string;
  branch_id: number;
}

export type UserFormEdit = Omit<UserForm, 'email' | 'branch_id'>;

export interface UserForm {
  first_name: string;
  last_name: string;
  email: string;
  branch_id: number;
}

export interface BranchesList {
  id: number;
  name: string;
}

export interface UserState {
  pagination: Pagination;
}
