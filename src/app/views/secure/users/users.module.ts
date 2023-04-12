import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersRoutingModule } from './users.routing.module';

@NgModule({
  declarations: [UsersListComponent],
  imports: [CommonModule, UsersRoutingModule],
})
export class UsersModule {}
