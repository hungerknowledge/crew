import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanRoutingModule } from './kanban-routing.module';
import { BoardComponent } from './pages/board/board.component';
import { CandidateComponent } from './components/candidate/candidate.component';


@NgModule({
  declarations: [BoardComponent, CandidateComponent],
  imports: [
    CommonModule,
    KanbanRoutingModule
  ]
})
export class KanbanModule { }
