import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PipelineComponent implements OnInit {
  @Input() title: string;
  @Input() height = 'calc(100vh - 56px)';
  @Output() customScrollToBottom = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  didScrollToBottom(event: CustomEvent<HTMLDivElement>): void {
    const eventTarget = event.target as HTMLElement;
    const scrollTop = eventTarget ? eventTarget.scrollTop : 0;
    const scrollHeight = eventTarget ? eventTarget.scrollHeight : 0;
    const offsetHeight = eventTarget ? eventTarget.offsetHeight : 0;
    const didScrollToBottom = scrollTop === (scrollHeight - offsetHeight);

    if (didScrollToBottom) {
      this.customScrollToBottom.emit();
    }
  }

}
