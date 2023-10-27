import { Component, OnDestroy, OnInit } from '@angular/core';
import { Users } from '../users.model';
import { Router } from '@angular/router';
import { UserService } from '../users.service';
import { Pagination } from 'src/app/shared/models/shared.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { actionSetUsersPagination } from '../store/users.action';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModelComponent } from 'src/app/shared/components/model/model.component';
import { ToastrService } from 'ngx-toastr';
import { selectUserState } from '../store/users.selector';
import { ErrorResponse } from 'src/app/shared/interceptors/error.interceptor';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit, OnDestroy {
  pagination!: Pagination;
  isLoading = false;
  users: Users[] = [];
  serialNo!: number;
  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    private userService: UserService,
    private store: Store<AppState>,
    private modalService: BsModalService,
    private toasterService: ToastrService
  ) {
    const observer = this.store
      .select(selectUserState)
      .subscribe((response) => {
        this.pagination = response.pagination;
      });
    this.subscriptions.add(observer);
  }

  ngOnInit(): void {
    this.getAllUsers(this.pagination.current_page);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getAllUsers(page: number) {
    this.isLoading = true;
    const observer = this.userService.getAllUsers(page).subscribe(
      (response) => {
        this.isLoading = false;
        this.users = response.users;
        this.store.dispatch(
          actionSetUsersPagination({ pagination: response.pagination })
        );
        this.serialNo = this.pagination.start_at;
      },
      (error: ErrorResponse) => {
        this.toasterService.error(error.errors[0]);
        this.isLoading = false;
      }
    );
    this.subscriptions.add(observer);
  }

  public onEdit(id: number): void {
    this.router.navigate(['users', 'edit', id]);
  }

  public onPageChange(page: number) {
    this.getAllUsers(page);
  }

  public onDelete(user: Users): void {
    const initialState: ModalOptions = {
      initialState: {
        text: `Do you really want to remove user ${user.first_name} ${
          user.last_name ? user.last_name : ''
        }`,
      },
    };
    const modal = this.modalService.show(ModelComponent, initialState);
    modal.content?.confirm.subscribe({
      next: () => {
        this.userService.deleteUser(user.id).subscribe({
          next: () => {
            this.onPageChange(1);
            this.toasterService.success('User deleted successfully');
          },
          error: () => {
            this.toasterService.error('Oops! Something went wrong');
          },
        });
      },
    });
  }

  onAddUser(): void {
    this.router.navigate(['users/add']);
  }
}
