/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HomeVacancy } from 'app/models/home-vacancy.types';
import { VacancyViewComponent } from '../vacancy-view/vacancy-view.component';

@Component({
    selector: 'app-vacancy-card',
    templateUrl: './vacancy-card.component.html',
    styleUrls: ['./vacancy-card.component.scss'],
})
export class VacancyCardComponent implements OnInit {
    //Variables
    @Input() vacancies: HomeVacancy[];

    constructor(private mat_dialog: MatDialog) {}

    ngOnInit(): void {}

    /**
     * to view vacancy
     * 
     * @param vacancy 
     */
    viewVacancy(vacancy: HomeVacancy) {
        this.mat_dialog.open(VacancyViewComponent, {
            disableClose: true,
            data: { vacancy_id: vacancy.vacancy_id },
            width: '640px'
        });
    }
}
