/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonResponse } from 'app/models/common-response.types';
import { VacancyDetails } from 'app/models/vacancy-details.types';
import { VacancyService } from 'app/modules/employer/services/vacancy.service';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-vacancy-view',
    templateUrl: './vacancy-view.component.html',
    styleUrls: ['./vacancy-view.component.scss'],
})
export class VacancyViewComponent implements OnInit {
    //Variables
    vacancy_details: VacancyDetails;

    readonly url: string = environment.url;

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: {
            vacancy_id: number;
        },
        private vacancy_service: VacancyService
    ) {}

    ngOnInit(): void {
        if (this.data && this.data.vacancy_id && this.data.vacancy_id > 0) {
            this.vacancy_service
                .getVacancyDetailsById(this.data.vacancy_id)
                .subscribe({
                    next: (res: CommonResponse<VacancyDetails>) => {
                        console.log(res);

                        this.vacancy_details = res.data;
                    },
                });
        }
    }
}
