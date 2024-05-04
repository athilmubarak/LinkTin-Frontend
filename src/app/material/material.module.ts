import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

const modules = [
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [...modules],
  providers: [
    MatDatepickerModule
  ]
})
export class MaterialModule { }
