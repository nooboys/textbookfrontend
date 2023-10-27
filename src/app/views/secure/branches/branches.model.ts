import { Pagination } from 'src/app/shared/models/shared.model';

export interface GetBranchResponse {
  pagination: Pagination;
  branches: Branches[];
}

export interface Branches {
  id: number;
  name: string;
  address: string;
  dl_type: string;
  district_id: number;
  district_name: string;
  created_at: string;
  updated_at: string;
}

export interface AddBranch {
  id: number;
  name: string;
  dl_type: string;
  address: string;
  district_id: number;
  created_at: string;
  updated_at: string;
}

export interface BranchForm {
  name: string;
  district_id: number;
  address: string;
  dl_type: string;
}

export type BranchListSortColumn =
  | BranchListSortColumns.id
  | BranchListSortColumns.name
  | BranchListSortColumns.address
  | BranchListSortColumns.dl_type
  | BranchListSortColumns.district_id
  | BranchListSortColumns.district_name
  | BranchListSortColumns.createdAt
  | BranchListSortColumns.updatedAt;

export enum BranchListSortColumns {
  id = 0,
  name = 'o_name',
  address = 'o_author',
  dl_type = 'o_dl_type',
  district_id = 'o_district_id',
  district_name = 'o_district_name',
  createdAt = 'o_created_at',
  updatedAt = 'o_updated_at',
}

export interface BranchState {
  pagination: Pagination;
}
