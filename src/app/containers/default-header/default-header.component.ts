import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '@coreui/angular';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { UserDetails } from 'src/app/views/public/authentication/authentication.model';
import { AuthenticationService } from 'src/app/views/public/authentication/authentication.service';
import { removeLoggedInUser } from 'src/app/views/public/authentication/store/authentication.action';
import { selectUserDetails } from 'src/app/views/public/authentication/store/authentication.selector';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss'],
})
export class DefaultHeaderComponent
  extends HeaderComponent
  implements OnDestroy, OnInit
{
  private subscriptions: Subscription | undefined;
  userDetails: UserDetails | undefined;

  constructor(
    private authenticationService: AuthenticationService,
    private store: Store<AppState>,
    private toasterService: ToastrService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    const observer = this.store
      .select(selectUserDetails)
      .subscribe((details: UserDetails) => {
        this.userDetails = details;
      });
    this.subscriptions?.add(observer);
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }

  onSignOut(): void {
    const observer = this.authenticationService.logout().subscribe(
      () => {
        this.store.dispatch(removeLoggedInUser());
        this.router.navigate(['/login']);
        this.toasterService.success('Logout Successful');
      },
      () => {
        this.store.dispatch(removeLoggedInUser());
        this.router.navigate(['/login']);
        this.toasterService.success('Logout Successful');
      }
    );
    this.subscriptions?.add(observer);
  }
}
