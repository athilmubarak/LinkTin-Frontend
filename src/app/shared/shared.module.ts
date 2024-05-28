import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/material/material.module';
import { VacancyViewComponent } from './components/vacancy-view/vacancy-view.component';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';
import { VacancyCardComponent } from './components/vacancy-card/vacancy-card.component';
import { FuseCardModule } from '@fuse/components/card';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        FuseCardModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        VacancyViewComponent,
        EmployeeCardComponent,
        VacancyCardComponent
    ],
    declarations: [
        VacancyViewComponent,
        EmployeeCardComponent,
        VacancyCardComponent
    ],
    entryComponents: [
        VacancyViewComponent
    ]
})
export class SharedModule {
}
