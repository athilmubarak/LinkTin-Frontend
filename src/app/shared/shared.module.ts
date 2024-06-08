import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/material/material.module';
import { VacancyViewComponent } from './components/vacancy-view/vacancy-view.component';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';
import { VacancyCardComponent } from './components/vacancy-card/vacancy-card.component';
import { FuseCardModule } from '@fuse/components/card';
import { HammerModule } from '@angular/platform-browser';
import { OtherAccountComponent } from './components/other-account/other-account.component';
import { AttachmentComponent } from './components/attachment/attachment.component';
import { DndDirective } from './directives/dnd.directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        FuseCardModule,
        HammerModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        VacancyViewComponent,
        EmployeeCardComponent,
        VacancyCardComponent,
        FuseCardModule,
        OtherAccountComponent,
        AttachmentComponent
    ],
    declarations: [
        VacancyViewComponent,
        EmployeeCardComponent,
        VacancyCardComponent,
        OtherAccountComponent,
        AttachmentComponent,
        DndDirective
    ],
    entryComponents: [
        VacancyViewComponent
    ]
})
export class SharedModule {
}
