import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersRoutingModule } from './users.routing.module';
import { IconModule } from '@coreui/icons-angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditUserComponent } from './users-edit/users-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddUserComponent } from './users-add/users-add.component';
import { ButtonModule } from '@coreui/angular';

@NgModule({
  declarations: [UsersListComponent, EditUserComponent, AddUserComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    IconModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    ButtonModule
  ],
})
export class UsersModule {}
