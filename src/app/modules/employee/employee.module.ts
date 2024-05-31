import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { FindJobsComponent } from './components/find-jobs/find-jobs.component';
import { MyJobsComponent } from './components/my-jobs/my-jobs.component';
import { SharedModule } from 'app/shared/shared.module';
import {editAttachmentComponent} from './components/dialog/edit-attachment-component';


@NgModule({
  declarations: [
    MyAccountComponent,
    FindJobsComponent,
    MyJobsComponent,
    editAttachmentComponent
    
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule
  ]
})
export class EmployeeModule { }
