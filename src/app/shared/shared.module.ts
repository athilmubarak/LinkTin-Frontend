import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/material/material.module';
import { VacancyViewComponent } from './components/vacancy-view/vacancy-view.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        VacancyViewComponent
    ],
    declarations: [
        VacancyViewComponent
    ],
    entryComponents: [
        VacancyViewComponent
    ]
})
export class SharedModule {
}
