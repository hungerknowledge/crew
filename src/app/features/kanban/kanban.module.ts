import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PlatformModule } from '@angular/cdk/platform';

import { KanbanRoutingModule } from './kanban-routing.module';
import { BoardComponent } from './pages/board/board.component';
import { CandidateComponent } from './components/candidate/candidate.component';
import { PipelineComponent } from './components/pipeline/pipeline.component';


@NgModule({
  declarations: [BoardComponent, CandidateComponent, PipelineComponent],
  imports: [
    CommonModule,
    KanbanRoutingModule,
    DragDropModule,
    PlatformModule
  ]
})
export class KanbanModule { }
