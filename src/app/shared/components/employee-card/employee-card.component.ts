/* eslint-disable arrow-parens */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    trigger,
    state,
    style,
    transition,
    animate,
} from '@angular/animations';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { CommonResponse } from 'app/models/common-response.types';
import { HomeEmployee } from 'app/models/home-employee.types';
import { SyncRegister } from 'app/models/sync-register.types';
import { User } from 'app/models/user.types';
import { SharedService } from 'app/shared/services/shared.service';
import { environment } from 'environments/environment';
import { Subject, takeUntil } from 'rxjs';

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
    user: User;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private shared_service: SharedService,
        private user_service: UserService,
        private change_detector_ref: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        // Subscribe to user changes
        this.user_service.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe({
                next: (user: User) => {
                    this.user = user;

                    // Mark for check
                    this.change_detector_ref.markForCheck();
                },
            });
    }

    /**
     * to reject
     *
     * @param employee
     */
    onSwipeLeft(employee: HomeEmployee) {
        employee.swipe_state = 'swipe-left';
        setTimeout(() => (employee.swipe_state = 'inactive'), 1000);
        this.registerVacancy(0, employee);
    }

    /**
     * to approve
     *
     * @param employee
     */
    onSwipeRight(employee: HomeEmployee) {
        employee.swipe_state = 'swipe-right';
        setTimeout(() => (employee.swipe_state = 'inactive'), 1000);
        this.registerVacancy(2, employee);
    }

    /**
     * to register entry in sync registry
     *
     * @param status
     * @param employee
     */
    registerVacancy(status: 0 | 2, employee: HomeEmployee) {
        const request_body: SyncRegister = {
            vacancy_id: employee.vacancy_id,
            status: status,
            approved_user_id: employee.employee_user_id,
            resume_attachment_id:
                this.user.attachments.length > 0
                    ? this.user.attachments[0].attachment_id
                    : null,
        };

        this.shared_service.syncVacancy(request_body).subscribe({
            next: (res: CommonResponse<HomeEmployee[]>) => {
                console.log(res);

                if (res.success) {
                    if (res.data.length > 0) {
                        const index = this.employees.findIndex(
                            (x) =>
                                x.employee_user_id ===
                                    employee.employee_user_id &&
                                x.vacancy_id === employee.vacancy_id
                        );

                        if (index >= 0) {
                            this.employees.splice(index, 1);
                            res.data.forEach((x) => {
                                const employee_index = this.employees.findIndex(
                                    (emp) =>
                                        x.employee_user_id ===
                                            emp.employee_user_id &&
                                        x.vacancy_id === emp.vacancy_id
                                );

                                if (employee_index === -1) {
                                    this.employees.push(x);
                                }
                            });
                        }
                    }
                }
            },
        });
    }
}
