import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatesComponent } from './components/candidates/candidates.component';
import { FindCandidatesComponent } from './components/find-candidates/find-candidates.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { VacanciesComponent } from './components/vacancies/vacancies.component';

const routes: Routes = [
  { path: 'candidates', component: CandidatesComponent },
  { path: 'find-candidates', component: FindCandidatesComponent },
  { path: 'my-account', component: MyAccountComponent },
  { path: 'vacancies', component: VacanciesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule { }
