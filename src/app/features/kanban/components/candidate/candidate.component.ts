import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { Candidate } from '../../models/candidate';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidateComponent implements OnInit {
  @Input() candidate: Candidate;
  networks = [
    'linkedin',
    'github',
    'twitter',
    'quora',
    'medium',
    'stackOverflow',
    'dribble',
    'website'
  ];

  constructor(
    private changeDetection: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  openNetwork(network: string): void {
    const url = this.candidate[network] ? this.candidate[network] : null;
    if (window && url) {
      window.open(url, '_blank');
    }
  }

  handleImageError(): void {
    this.candidate.picture = null;
    this.changeDetection.markForCheck();
  }

}
