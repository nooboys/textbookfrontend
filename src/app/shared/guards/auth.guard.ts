import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { selectToken } from 'src/app/views/public/authentication/store/authentication.selector';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  token = '';
  constructor(private readonly store: Store<AppState>, private router: Router) {
    this.store.select(selectToken).subscribe((value) => {
      this.token = value;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.token) {
      return true;
    } else {
      return this.router.navigate(['/login']);
    }
  }
}
