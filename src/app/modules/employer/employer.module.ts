import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerRoutingModule } from './employer-routing.module';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { FindCandidatesComponent } from './components/find-candidates/find-candidates.component';
import { CandidatesComponent } from './components/candidates/candidates.component';


@NgModule({
  declarations: [
    MyAccountComponent,
    FindCandidatesComponent,
    CandidatesComponent
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule
  ]
})
export class EmployerModule { }
