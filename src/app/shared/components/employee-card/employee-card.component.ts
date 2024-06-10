/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    trigger,
    state,
    style,
    transition,
    animate,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { HomeEmployee } from 'app/models/home-employee.types';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-employee-card',
    templateUrl: './employee-card.component.html',
    styleUrls: ['./employee-card.component.scss'],
    animations: [
        trigger('swipeAnimation', [
            state(
                'inactive',
                style({
                    transform: 'translateX(0)',
                    opacity: 0,
                })
            ),
            state(
                'swipeRight',
                style({
                    transform: 'translateX(100%)',
                    opacity: 1,
                    backgroundColor: 'green',
                })
            ),
            state(
                'swipeLeft',
                style({
                    transform: 'translateX(-100%)',
                    opacity: 1,
                    backgroundColor: 'red',
                })
            ),
            transition('inactive => swipeRight', [animate('1s ease-in-out')]),
            transition('swipeRight => inactive', [animate('1s ease-in-out')]),
            transition('inactive => swipeLeft', [animate('1s ease-in-out')]),
            transition('swipeLeft => inactive', [animate('1s ease-in-out')]),
        ]),
    ],
})
export class EmployeeCardComponent implements OnInit {
    //Variables
    @Input() employees: HomeEmployee[];

    readonly url: string = environment.url;

    constructor() {}

    ngOnInit(): void {}

    onSwipeLeft(employee: HomeEmployee) {
        //
        employee.swipe_state = 'swipe-left';
        setTimeout(() => (employee.swipe_state = 'inactive'), 1000);
    }

    onSwipeRight(employee: HomeEmployee) {
        //

        employee.swipe_state = 'swipe-right';
        setTimeout(() => (employee.swipe_state = 'inactive'), 1000);
    }
}
