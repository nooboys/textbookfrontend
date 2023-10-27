import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { EditUserComponent } from './users-edit/users-edit.component';
import { AddUserComponent } from './users-add/users-add.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersListComponent,
  },
  {
    path: 'users/edit/:id',
    component: EditUserComponent,
  },
  {
    path: 'users/add',
    component: AddUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
