import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchesListComponent } from './branches-list/branches-list.component';
import { AddBranchComponent } from './branches-add/branches-add.component';
import { EditBranchComponent } from './branches-edit/branch-edit.component';

const routes: Routes = [
  {
    path: 'branches',
    component: BranchesListComponent,
  },
  {
    path: 'branches/add',
    component: AddBranchComponent,
  },
  {
    path: 'branches/edit/:id',
    component: EditBranchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BranchesRoutingModule {}
