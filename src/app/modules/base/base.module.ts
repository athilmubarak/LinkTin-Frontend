import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseRoutingModule } from './base-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    BaseRoutingModule,
    SharedModule
  ]
})
export class BaseModule { }
