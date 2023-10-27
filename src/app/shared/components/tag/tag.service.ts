import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TagResponse } from './tag.model';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  getTags(): Observable<TagResponse> {
    return this.httpClient.get<TagResponse>(`${this.apiUrl}/v1/tags`);
  }
}
