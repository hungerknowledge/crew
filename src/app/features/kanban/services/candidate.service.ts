import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Candidate } from '../models/candidate';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getCandidates(): Observable<Candidate[]> {
    return this.httpClient.get<Candidate[]>(`${environment.apiUrl}/talents`);
  }
}
