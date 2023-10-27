import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pagination } from '../../models/shared.model';
import { log } from 'console';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() pagination: Pagination | undefined;
  @Output() pageChange = new EventEmitter<number>();

  public onNavigateToPage(page: number): void {
    this.pageChange.emit(page);
  }
}
