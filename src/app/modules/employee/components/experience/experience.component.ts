/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { FuseAlertType } from '@fuse/components/alert';
import { UserService } from 'app/core/user/user.service';
import { EmployeeService } from '../../services/employee.service';
import { SharedService } from 'app/shared/services/shared.service';
import { Experience } from 'app/models/experience.types';
import {
    MatDialogRef,
    MAT_DIALOG_DATA,
    MatDialog,
} from '@angular/material/dialog';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';
import { Job } from 'app/models/job.types';
import { Observable } from 'rxjs';
import { CommonResponse } from 'app/models/common-response.types';
import { User } from 'app/models/user.types';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';
import {
    MomentDateAdapter,
    MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
    DateAdapter,
    MAT_DATE_LOCALE,
    MAT_DATE_FORMATS,
} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
    parse: {
        dateInput: 'MM/YYYY',
    },
    display: {
        dateInput: 'MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: 'app-experience',
    templateUrl: './experience.component.html',
    styleUrls: ['./experience.component.scss'],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
        },

        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
    encapsulation: ViewEncapsulation.None,
})
export class ExperienceComponent implements OnInit {
    //FormGroup
    experience_form: FormGroup;

    //Variables
    jobs: Job[] = [];

    constructor(
        private form_builder: FormBuilder,
        private user_service: UserService,
        private employee_service: EmployeeService,
        private shared_service: SharedService,
        private dialog_ref: MatDialogRef<UpdateEmployeeComponent>,
        private mat_dialog: MatDialog,
        private snack_bar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA)
        public data: {
            experience?: Experience;
            user: User;
        }
    ) {
        this.shared_service.getJobs();

        this.experience_form = this.form_builder.group({
            job: new FormControl('', Validators.required),
            company: new FormControl('', Validators.required),
            location: new FormControl('', Validators.required),
            joining_date: new FormControl(moment(), Validators.required),
            relieving_date: new FormControl(moment()),
            is_currently_working: new FormControl(''),
            display_order: new FormControl(''),
        });

        setTimeout(() => {
            this.filterJobs('');
        }, 2000);
    }

    ngOnInit(): void {
        if (this.data.experience) {
            const job = this.shared_service.jobs.find(
                (x: Job) => x.job_id === this.data.experience.job_id
            );

            this.experience_form.patchValue({
                job: job,
                company: this.data.experience.company,
                location: this.data.experience.location,
                joining_date: this.data.experience.joining_date,
                relieving_date: this.data.experience.relieving_date,
                is_currently_working:
                    this.data.experience.is_currently_working === 1,
                display_order: this.data.experience.display_order,
            });
        } else {
            this.experience_form.patchValue({
                is_currently_working: false,
                display_order: 1,
            });
        }
    }

    /**
     * to save experience
     *
     * @returns
     */
    saveExperience() {
        if (this.experience_form.invalid) {
            return;
        }

        const experience: Experience = {
            job_id: this.experience_form.get('job').value.job_id,
            company: this.experience_form.get('company').value,
            location: this.experience_form.get('location').value,
            joining_date: this.experience_form.get('joining_date').value,
            relieving_date: this.experience_form.get('relieving_date').value,
            is_currently_working: this.experience_form.get(
                'is_currently_working'
            ).value
                ? 1
                : 0,
            display_order: this.experience_form.get('display_order').value,
        };

        let request: Observable<CommonResponse<Experience>>;

        if (this.data.experience) {
            request = this.employee_service.updateExperience(
                experience,
                this.data.experience.id
            );
        } else {
            request = this.employee_service.createExperience(experience);
        }

        request.subscribe({
            next: (res: CommonResponse<Experience>) => {
                console.log(res);

                this.snack_bar.open(res.message, 'Close', {
                    duration: 2000,
                    panelClass: res.success
                        ? 'success-message'
                        : 'error-message',
                });

                if (res.success) {
                    if (this.data.experience) {
                        this.data.user.experiences =
                            this.data.user.experiences.map((x: Experience) => {
                                if (x.id === res.data.id) {
                                    return res.data;
                                } else {
                                    return x;
                                }
                            });
                    } else {
                        this.data.user.experiences.push(res.data);
                    }

                    this.user_service.user = this.data.user;
                    this.dialog_ref.close();
                }
            },
        });
    }

    /**
     * to filter jobs
     *
     * @param value
     */
    filterJobs(value: string) {
        if ([undefined, null, '', ' '].includes(value)) {
            this.jobs = [...this.shared_service.jobs];
        } else {
            this.jobs = this.shared_service.jobs.filter((x: Job) =>
                x.name.toLowerCase().includes(value.toLowerCase())
            );
        }
    }

    /**
     * display function for job auto-complete
     *
     * @param job
     * @returns
     */
    displayFn(job: Job): string {
        return job && job.name ? job.name : '';
    }

    /**
     * to show or hide job save button
     *
     * @returns
     */
    showDoneButtonForJob(): boolean {
        return (
            ![null, undefined, '', ' '].includes(
                this.experience_form.get('job').value
            ) && this.jobs.length === 0
        );
    }

    /**
     * to save new job
     */
    saveNewJob() {
        this.shared_service
            .createNewJob({ name: this.experience_form.get('job').value })
            .subscribe({
                next: (res: CommonResponse<Job>) => {
                    console.log(res);

                    if (res.success) {
                        this.experience_form.get('job').setValue(res.data);
                        this.jobs = [res.data];
                        this.shared_service.jobs.push(res.data);
                    }
                },
            });
    }

    /**
     * to set month and year of date picker
     *
     * @param normalized_month_and_year
     * @param date_picker
     * @param form_control_name
     */
    setMonthAndYear(
        normalized_month_and_year: Moment,
        date_picker: MatDatepicker<Moment>,
        form_control_name: string
    ) {
        const ctrlValue = this.experience_form.get(form_control_name).value;
        ctrlValue.month(normalized_month_and_year.month());
        ctrlValue.year(normalized_month_and_year.year());
        this.experience_form.get(form_control_name).setValue(ctrlValue);
        date_picker.close();
    }
}
