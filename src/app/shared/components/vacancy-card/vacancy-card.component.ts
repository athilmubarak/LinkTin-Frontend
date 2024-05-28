import { Component, Input, OnInit } from '@angular/core';
import { HomeVacancy } from 'app/models/home-vacancy.types';

@Component({
    selector: 'app-vacancy-card',
    templateUrl: './vacancy-card.component.html',
    styleUrls: ['./vacancy-card.component.scss'],
})
export class VacancyCardComponent implements OnInit {
    //Variables
    @Input() vacancies: HomeVacancy[];

    constructor() {}

    ngOnInit(): void {}
}
