/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HomeVacancy } from 'app/models/home-vacancy.types';
import { VacancyViewComponent } from '../vacancy-view/vacancy-view.component';
import {
    trigger,
    state,
    style,
    transition,
    animate,
} from '@angular/animations';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-vacancy-card',
    templateUrl: './vacancy-card.component.html',
    styleUrls: ['./vacancy-card.component.scss'],
    animations: [
      trigger('swipeAnimation', [
        state('inactive', style({
          transform: 'translateX(0)',
          opacity: 0,
        })),
        state('swipeRight', style({
          transform: 'translateX(100%)',
          opacity: 1,
          backgroundColor: 'green',
        })),
        state('swipeLeft', style({
          transform: 'translateX(-100%)',
          opacity: 1,
          backgroundColor: 'red',
        })),
        transition('inactive => swipeRight', [
          animate('1s ease-in-out')
        ]),
        transition('swipeRight => inactive', [
          animate('1s ease-in-out')
        ]),
        transition('inactive => swipeLeft', [
          animate('1s ease-in-out')
        ]),
        transition('swipeLeft => inactive', [
          animate('1s ease-in-out')
        ]),
      ])
    ],
})
export class VacancyCardComponent implements OnInit {
    //Variables
    @Input() vacancies: HomeVacancy[];

    readonly url: string = environment.url;

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
            width: '640px',
        });
    }

    onSwipeLeft(vacancy: HomeVacancy) {
        //
        console.log(vacancy + 'left');
        vacancy.swipe_state = 'swipe-left';
        setTimeout(() => (vacancy.swipe_state = 'inactive'), 1000);
    }

    onSwipeRight(vacancy: HomeVacancy) {
        //
        console.log(vacancy + 'right');

        vacancy.swipe_state = 'swipe-right';
        setTimeout(() => (vacancy.swipe_state = 'inactive'), 1000);
    }
}
