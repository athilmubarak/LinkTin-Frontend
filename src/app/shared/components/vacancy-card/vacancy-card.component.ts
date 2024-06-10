/* eslint-disable arrow-parens */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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
import { SharedService } from 'app/shared/services/shared.service';
import { SyncRegister } from 'app/models/sync-register.types';
import { User } from 'app/models/user.types';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'app/core/user/user.service';
import { CommonResponse } from 'app/models/common-response.types';

@Component({
    selector: 'app-vacancy-card',
    templateUrl: './vacancy-card.component.html',
    styleUrls: ['./vacancy-card.component.scss'],
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
export class VacancyCardComponent implements OnInit {
    //Variables
    @Input() vacancies: HomeVacancy[];

    readonly url: string = environment.url;
    user: User;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private mat_dialog: MatDialog,
        private shared_service: SharedService,
        private change_detector_ref: ChangeDetectorRef,
        private user_service: UserService
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

    /**
     * to reject vacancy
     *
     * @param vacancy
     */
    onSwipeLeft(vacancy: HomeVacancy) {
        vacancy.swipe_state = 'swipe-left';
        setTimeout(() => (vacancy.swipe_state = 'inactive'), 1000);
        this.registerVacancy(0, vacancy);
    }

    /**
     * to approve vacancy
     *
     * @param vacancy
     */
    onSwipeRight(vacancy: HomeVacancy) {
        vacancy.swipe_state = 'swipe-right';
        setTimeout(() => (vacancy.swipe_state = 'inactive'), 1000);
        this.registerVacancy(1, vacancy);
    }

    /**
     * to register entry in sync registry
     *
     * @param status
     * @param vacancy
     */
    registerVacancy(status: 0 | 1, vacancy: HomeVacancy) {
        const request_body: SyncRegister = {
            vacancy_id: vacancy.vacancy_id,
            status: status,
            approved_user_id: vacancy.user_id,
            resume_attachment_id:
                this.user.attachments.length > 0
                    ? this.user.attachments[0].attachment_id
                    : null,
        };

        this.shared_service.syncVacancy(request_body).subscribe({
            next: (res: CommonResponse<HomeVacancy[]>) => {
                console.log(res);

                if (res.success) {
                    this.vacancies = this.vacancies.filter(
                        (x) => x.vacancy_id !== vacancy.vacancy_id
                    );
                    if (res.data.length > 0) {
                        const vacancy_ids: number[] = this.vacancies
                            .map((x) => x.vacancy_id)
                            .filter((x) => x !== vacancy.vacancy_id);

                        // this.vacancies.push(...res.data);
                    }
                }
            },
        });
    }
}
