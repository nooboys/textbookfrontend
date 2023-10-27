import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectToken } from 'src/app/views/public/authentication/store/authentication.selector';
import { AppState } from 'src/app/app.reducer';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token = '';
  constructor(private store: Store<AppState>) {
    this.store.select(selectToken).subscribe((token: string) => {
      this.token = token;
    });
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.token) {
      request = request.clone({
        setHeaders: { Authorization: this.token },
      });
    }
    return next.handle(request);
  }
}
