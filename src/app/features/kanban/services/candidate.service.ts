import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Candidate } from '../models/candidate';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getCandidates(): Observable<Candidate[]> {
    return this.httpClient.get<Candidate[]>(`https://hiring.crew.work/v1/talents?page=1&limit=30`);
  }
}
