import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerRoutingModule } from './employer-routing.module';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { FindCandidatesComponent } from './components/find-candidates/find-candidates.component';
import { CandidatesComponent } from './components/candidates/candidates.component';
import { VacanciesComponent } from './components/vacancies/vacancies.component';
import { SharedModule } from 'app/shared/shared.module';
import { QuillModule } from 'ngx-quill';
import { UpdateVacancyComponent } from './components/update-vacancy/update-vacancy.component';
import { UpdateEmployerComponent } from './components/update-employer/update-employer.component';


@NgModule({
  declarations: [
    MyAccountComponent,
    FindCandidatesComponent,
    CandidatesComponent,
    VacanciesComponent,
    UpdateVacancyComponent,
    UpdateEmployerComponent
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    SharedModule,
    QuillModule.forRoot()
  ],
  entryComponents: [
    UpdateVacancyComponent
  ]
})
export class EmployerModule { }
