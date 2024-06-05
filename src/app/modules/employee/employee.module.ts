import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { FindJobsComponent } from './components/find-jobs/find-jobs.component';
import { MyJobsComponent } from './components/my-jobs/my-jobs.component';
import { SharedModule } from 'app/shared/shared.module';
import {editAttachmentComponent} from './components/dialog/edit-attachment-component';
import { ExperienceComponent } from './components/experience/experience.component';
import { EducationComponent } from './components/education/education.component';
import { CertificationComponent } from './components/certification/certification.component';
import { LicenseComponent } from './components/license/license.component';
import { ReferenceComponent } from './components/reference/reference.component';


@NgModule({
  declarations: [
    MyAccountComponent,
    FindJobsComponent,
    MyJobsComponent,
    editAttachmentComponent,
    ExperienceComponent,
    EducationComponent,
    CertificationComponent,
    LicenseComponent,
    ReferenceComponent
    
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule
  ]
})
export class EmployeeModule { }
