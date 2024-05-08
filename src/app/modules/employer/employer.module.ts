import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerRoutingModule } from './employer-routing.module';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { FindCandidatesComponent } from './components/find-candidates/find-candidates.component';
import { CandidatesComponent } from './components/candidates/candidates.component';
import { VacanciesComponent } from './components/vacancies/vacancies.component';
import { SharedModule } from 'app/shared/shared.module';
import { QuillModule } from 'ngx-quill';


@NgModule({
  declarations: [
    MyAccountComponent,
    FindCandidatesComponent,
    CandidatesComponent,
    VacanciesComponent
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    SharedModule,
    QuillModule.forRoot()
  ]
})
export class EmployerModule { }
