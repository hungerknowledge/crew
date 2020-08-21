import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Platform } from '@angular/cdk/platform';
import { CandidateService } from '../../services';
import { Candidate, Pipeline } from '../../models';
import { Constants } from '../../constants';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, AfterViewInit {
  @ViewChild('filters') filters: ElementRef;
  candidates: Candidate[];
  pipelines: Pipeline[] = [];
  pipelineOptions: string[];
  tags: string[];
  filtersHeight = 0;
  candidatesFilter: string[];
  pipelinesFilter: string[];
  isMobile = false;

  constructor(
    private candidateService: CandidateService,
    private platform: Platform
  ) { }

  ngOnInit(): void {
    this.isMobile = this.platform.ANDROID || this.platform.IOS;
    this.fetchCandidates();
  }

  ngAfterViewInit(): void {
    this.filtersHeight = this.filters.nativeElement.offsetHeight;
  }

  fetchCandidates(): void {
    this.candidateService.getCandidates().subscribe({
      next: (candidates) => {
        this.candidates = candidates;
        this.pipelines = this.getPipelines(candidates);
        this.pipelineOptions = this.pipelines.map((pipeline) => pipeline.title);
        this.tags = this.getTags(candidates);
      },
      error: (error) => {
        console.log('Error fetching candidates: ', error);
      }
    });
  }

  getPipelines(candidates: Candidate[]): Pipeline[] {
    const typesOfPipeline: string[] = candidates.map((candidate) => {
      return candidate.stage;
    })
      .reduce((list, item) => {
        return list.includes(item) ? list : [...list, item];
      }, []);

    const pipelines = typesOfPipeline.map((type) => {
      const candidatesForType = this.candidates.filter((candidate) => candidate.stage === type);
      return {
        title: type,
        candidates: candidatesForType
      };
    });

    return this.sortPipelines(pipelines);
  }

  getPipelineCandidates(pipelineTitle: string): Candidate[] {
    return this.candidates.filter((candidate) => candidate.stage === pipelineTitle);
  }

  getTags(candidates: Candidate[]): string[] {
    return candidates.map((candidate) => candidate.tags)
      .reduce((list, items) => {
        const uniqueItems = items.filter((item) => !list.includes(item));
        return [...list, ...uniqueItems];
      }, []);
  }

  sortPipelines(pipelines: Pipeline[]): Pipeline[] {
    const result: Pipeline[] = [];

    Constants.PIPELINE_ORDER.forEach((item) => {
      const foundPipeline = pipelines.find((pipeline) => pipeline.title === item);
      if (foundPipeline) {
        result.push(foundPipeline);
      }
    });

    return result;
  }

  dropCandidate(event: CdkDragDrop<Candidate[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  filterCandidates(selection: string[]): void {
    const pipelines = this.pipelinesFilter && this.pipelinesFilter.length > 0 ?
      this.pipelines : this.getPipelines(this.candidates);
    this.candidatesFilter = selection;
    this.pipelines = this.filterCandidateByTag(selection, pipelines);
  }

  filterCandidateByTag(selection: string[], pipelines: Pipeline[]): Pipeline[] {
    return pipelines.map((pipeline) => {
      pipeline.candidates = pipeline.candidates.filter((candidate) => {
        return selection.length > 0 ?
          selection.filter((tag) => candidate.tags.includes(tag)).length === selection.length : true;
      });

      if (selection.length <= 0) {
        pipeline.candidates = this.getPipelineCandidates(pipeline.title);
      }

      return pipeline;
    });
  }

  filterPipelines(selection: string[]): void {
    const pipelines = this.candidatesFilter && this.candidatesFilter.length > 0 ?
      this.pipelines : this.getPipelines(this.candidates);
    this.pipelinesFilter = selection;

    if (selection.length > 0) {
      const visibleSelection = pipelines.filter((pipeline) => selection.includes(pipeline.title));
      this.pipelines = pipelines.filter((pipeline) => {
        return selection.includes(pipeline.title);
      });

      if (visibleSelection.length !== selection.length) {
        const selectionAdded = visibleSelection.map((pipeline) => pipeline.title);
        const selectionToAdd = selection.filter((item) => !selectionAdded.includes(item));
        let pipelinesToAdd = this.getPipelines(this.candidates).filter((pipeline) =>  selectionToAdd.includes(pipeline.title));

        if (this.candidatesFilter && this.candidatesFilter.length > 0) {
          pipelinesToAdd = this.filterCandidateByTag(this.candidatesFilter, pipelinesToAdd);
        }

        this.pipelines.push(...pipelinesToAdd);
      }
    } else {
      if (this.candidatesFilter && this.candidatesFilter.length > 0) {
        this.pipelines = this.filterCandidateByTag(this.candidatesFilter, this.getPipelines(this.candidates));
      } else {
        this.pipelines = this.getPipelines(this.candidates);
      }
    }
  }
}
