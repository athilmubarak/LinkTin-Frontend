/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
    Inject,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MyJobsService } from '../../services/my-jobs.service';
import { MatSort } from '@angular/material/sort';
import { CommonResponse } from 'app/models/common-response.types';
import { MyJobs } from 'app/models/my-jobs.type';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'app/models/user.types';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { MatDialog } from '@angular/material/dialog';
import { editAttachmentComponent } from '../dialog/edit-attachment-component';
import { UserService } from 'app/core/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'environments/environment';
import { VacancyViewComponent } from 'app/shared/components/vacancy-view/vacancy-view.component';
import { Attachment } from 'app/models/attachment.types';

export interface DialogData {
    item: MyJobs;
}
@Component({
    selector: 'app-my-jobs',
    templateUrl: './my-jobs.component.html',
    styleUrls: ['./my-jobs.component.scss'],
})
export class MyJobsComponent implements OnInit {
    //Variables
    user: User;
    filter_type: number = 0;
    my_jobs: MyJobs[] = [];
    readonly url: string = environment.url;

    //Mat-table related variables
    data_source = new MatTableDataSource<MyJobs>();
    displayed_columns: string[] = [
        'sl',
        'jobName',
        'company_name',
        'applied_date',
        'statusName',
        'admin',
    ];
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private myJobs_service: MyJobsService,
        private _changeDetectorRef: ChangeDetectorRef,
        private confirmation_dialog: FuseConfirmationService,
        public dialog: MatDialog,
        private _userService: UserService,
        private snack_bar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.getVacancies();

        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this.user = user;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * to get filtered job types
     */
    filterDataByType() {
        let data = [];
        if (this.filter_type === 0) {
            //All
            data = this.my_jobs;
        } else if (this.filter_type === 1) {
            //Applied Jobs
            data = this.my_jobs.filter(
                (job) => job.applied_user_id === this.user.user_details.user_id
            );
        } else if (this.filter_type === 2) {
            //Approached by company
            data = this.my_jobs.filter(
                (job) => job.approved_user_id === this.user.user_details.user_id
            );
        }

        this.data_source = new MatTableDataSource(data);
        this.data_source.sort = this.sort;
    }

    /**
     * to get all my jobs
     */
    getVacancies() {
        this.data_source = new MatTableDataSource();
        this.my_jobs = [];

        this.myJobs_service.getAllJobVacancies().subscribe({
            next: (res: CommonResponse<MyJobs[]>) => {
                console.log(res);
                this.data_source = new MatTableDataSource(res.data);
                this.data_source.sort = this.sort;
                this.my_jobs = res.data;
            },
        });
    }

    redirectUrl(row: MyJobs) {
        window.open(this.url + row.attachment_url, '_blank');
    }

    /**
     * to delete job request or application
     *
     * @param job
     */
    deleteJob(job: MyJobs) {
        const dialog_ref = this.confirmation_dialog.open({
            title: 'Remove Job Request',
            message:
                "Are you sure you want to delete this cancel this job application ? This action cannot be undone. Click 'Confirm' to proceed with the deletion, or 'Cancel' to return to the job request.",
            icon: {
                show: false,
            },
            actions: {
                confirm: {
                    show: true,
                    label: 'Confirm',
                    color: 'primary',
                },
                cancel: {
                    show: true,
                    label: 'Cancel',
                },
            },
            dismissible: false,
        });

        dialog_ref.afterClosed().subscribe({
            next: (confirmed: string) => {
                if (confirmed === 'confirmed') {
                    this.myJobs_service
                        .deleteJob(job.sync_registry_id)
                        .subscribe({
                            next: (res: CommonResponse<number>) => {
                                console.log(res);

                                this.snack_bar.open(res.message, 'Close', {
                                    duration: 2000,
                                    panelClass: res.success
                                        ? 'success-message'
                                        : 'error-message',
                                });

                                if (res.success) {
                                    const index = this.my_jobs.findIndex(
                                        (x) =>
                                            x.sync_registry_id ===
                                            job.sync_registry_id
                                    );

                                    if (index >= 0) {
                                        this.my_jobs.splice(index, 1);
                                        this.filterDataByType();
                                    }
                                }
                            },
                        });
                }
            },
        });
    }

    /**
     * to edit attachments
     *
     * @param item
     *
     */
    openDialog(item: MyJobs) {
        const dialog_ref = this.dialog.open(editAttachmentComponent, {
            width: '800px',
            data: { item },
            disableClose: true,
        });

        dialog_ref.afterClosed().subscribe({
            next: (res: CommonResponse<Attachment>) => {
                if (res && res.success) {
                    this.my_jobs = this.my_jobs.map((x) => {
                        if (x.sync_registry_id === item.sync_registry_id) {
                            return {
                                ...x,
                                resume_attachment_id: res.data.attachment_id,
                                attachment_url: res.data.attachment_url,
                            };
                        } else {
                            return x;
                        }
                    });
                    this.filterDataByType();
                }
            },
        });
    }

    /**
     * to view vacancy
     *
     * @param job
     */
    viewVacancy(job: MyJobs) {
        this.dialog.open(VacancyViewComponent, {
            disableClose: true,
            data: { vacancy_id: job.vacancy_id },
            width: '640px',
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    /**
     * to update status of job request, either accept or reject
     *
     * @param job
     * @param status
     */
    updateStatus(job: MyJobs, status: 1 | 0): void {
        this.myJobs_service
            .updateRequestStatus(job.sync_registry_id, status)
            .subscribe({
                next: (res: CommonResponse<number>) => {
                    console.log(res);

                    this.snack_bar.open(res.message, 'Close', {
                        duration: 2000,
                        panelClass: res.success
                            ? 'success-message'
                            : 'error-message',
                    });

                    if (res.success) {
                        this.my_jobs = this.my_jobs.map((x) => {
                            if (x.sync_registry_id === job.sync_registry_id) {
                                return {
                                    ...x,
                                    status: status,
                                    statusName:
                                        status === 1 ? 'Approved' : 'Rejected',
                                };
                            } else {
                                return x;
                            }
                        });
                        this.filterDataByType();
                    }
                },
            });
    }
}
