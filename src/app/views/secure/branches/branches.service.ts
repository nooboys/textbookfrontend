import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AddBranch,
  BranchForm,
  Branches,
  GetBranchResponse,
} from './branches.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SuccessMessage } from 'src/app/shared/models/shared.model';
import { BranchesList } from '../users/users.model';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  readonly apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getBranchDetails(branchId: number): Observable<Branches> {
    return this.httpClient.get<Branches>(
      `${this.apiUrl}/v1/branches/${branchId}`
    );
  }

  getBranch(page: number): Observable<GetBranchResponse> {
    let params = new HttpParams();
    params = params.append('page', page);
    return this.httpClient.get<GetBranchResponse>(
      `${this.apiUrl}/v1/branches`,
      {
        params,
      }
    );
  }

  addBranch(branches: BranchForm): Observable<AddBranch> {
    return this.httpClient.post<AddBranch>(
      `${this.apiUrl}/v1/branches`,
      branches
    );
  }

  updateBranch(branch: BranchForm, branchId: number): Observable<AddBranch> {
    return this.httpClient.put<AddBranch>(
      `${this.apiUrl}/v1/branches/${branchId}`,
      branch
    );
  }

  getDistrictNames(): Observable<BranchesList[]> {
    return this.httpClient.get<BranchesList[]>(
      `${this.apiUrl}/v1/districts/ids_and_names`
    );
  }

  deleteUser(id: number) {
    return this.httpClient.delete<SuccessMessage>(
      `${this.apiUrl}/v1/branches/${id}`
    );
  }
}
