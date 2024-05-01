import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatesComponent } from './components/candidates/candidates.component';
import { FindCandidatesComponent } from './components/find-candidates/find-candidates.component';
import { MyAccountComponent } from './components/my-account/my-account.component';

const routes: Routes = [
  { path: 'candidates', component: CandidatesComponent },
  { path: 'find-candidates', component: FindCandidatesComponent },
  { path: 'my-account', component: MyAccountComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule { }
