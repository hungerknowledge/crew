import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Platform } from '@angular/cdk/platform';
import { CandidateService } from '../../services';
import { Candidate, Pipeline } from '../../models';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  candidates: Candidate[];
  pipelines: Pipeline[] = [];
  tags: string[];
  filteredTags: string[];
  isMobile = false;

  constructor(
    private candidateService: CandidateService,
    private platform: Platform
  ) { }

  ngOnInit(): void {
    this.isMobile = this.platform.ANDROID || this.platform.IOS;
    this.fetchCandidates();
  }

  fetchCandidates(): void {
    this.candidateService.getCandidates().subscribe({
      next: (candidates) => {
        this.candidates = candidates;
        this.pipelines = this.getPipelines(candidates);
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

    return typesOfPipeline.map((type) => {
      const candidatesForType = this.candidates.filter((candidate) => candidate.stage === type);
      return {
        title: type,
        candidates: candidatesForType
      };
    });
  }

  getTags(candidates: Candidate[]): string[] {
    return candidates.map((candidate) => candidate.tags)
      .reduce((list, items) => {
        const uniqueItems = items.filter((item) => !list.includes(item));
        return [...list, ...uniqueItems];
      }, []);
  }

  dropCandidate(event: CdkDragDrop<Candidate[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  filterCandidates(tag: string): void {
    this.pipelines = this.pipelines.map((pipeline) => {
      pipeline.candidates = pipeline.candidates.filter((candidate) => candidate.tags.includes(tag));

      return pipeline;
    });
  }
}
