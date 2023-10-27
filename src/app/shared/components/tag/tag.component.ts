import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TagService } from './tag.service';
import { Tag, TagResponse } from './tag.model';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit, OnDestroy {
  tag: string | undefined;
  tags: string[] = [];
  recommendedTags: Tag[] = [];
  private subscriptions = new Subscription();

  @Output() tagChange = new EventEmitter<Tag[]>();
  @Input() selectedTags: number[] | undefined;
  constructor(private tagService: TagService) {}

  ngOnInit(): void {
    this.getTags();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private getTags(): void {
    const subscription = this.tagService
      .getTags()
      .subscribe((response: TagResponse) => {
        this.recommendedTags = response.tags;
      });

    this.subscriptions.add(subscription);
  }

  public onTagChange(event: Tag[]): void {
    this.tagChange.emit(event);
  }
}
