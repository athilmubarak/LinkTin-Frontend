import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { FindJobsComponent } from './components/find-jobs/find-jobs.component';
import { MyJobsComponent } from './components/my-jobs/my-jobs.component';

const routes: Routes = [
  { path: 'my-account', component: MyAccountComponent },
  { path: 'find-jobs', component: FindJobsComponent },
  { path: 'my-jobs', component: MyJobsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
