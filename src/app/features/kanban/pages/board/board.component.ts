import { Component, OnInit } from '@angular/core';
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

  constructor(
    private candidateService: CandidateService
  ) { }

  ngOnInit(): void {
    this.fetchCandidates();
  }

  fetchCandidates(): void {
    this.candidateService.getCandidates().subscribe({
      next: (candidates) => {
        this.candidates = candidates;
        this.setPipelines(candidates);
      },
      error: (error) => {
        console.log('Error fetching candidates: ', error);
      }
    });
  }

  setPipelines(candidates: Candidate[]): void {
    const typesOfPipeline: string[] = candidates.map((candidate) => {
      return candidate.stage;
    })
      .reduce((list, item) => {
        return list.includes(item) ? list : [...list, item];
      }, []);

    this.pipelines = typesOfPipeline.map((type) => {
      const candidatesForType = this.candidates.filter((candidate) => candidate.stage === type);
      return {
        title: type,
        candidates: candidatesForType
      };
    });
  }

}
