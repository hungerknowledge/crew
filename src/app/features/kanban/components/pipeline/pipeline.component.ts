import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PipelineComponent implements OnInit {
  @Input() title: string;
  @Input() height = 'calc(100vh - 56px)';

  constructor() { }

  ngOnInit(): void {
  }

}
