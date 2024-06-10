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
import { FuseAlertType } from '@fuse/components/alert';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'app/models/user.types';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { editAttachmentComponent } from '../dialog/edit-attachment-component';
import { UserService } from 'app/core/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
    item: any;
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

    //Mat-table related variables
    data_source = new MatTableDataSource<MyJobs>();
    displayed_columns: string[] = [
        'sl',
        'job_name',
        'company_name',
        'applied_date',
        'status_description',
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
                (job) => job.applied_user_id === this.user.user_details.user_id
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
            error: () => {
                const data: MyJobs[] = [
                    {
                        sync_registry_id: 1,
                        vacancy_id: 1,
                        job_id: '1',
                        job_name: 'Frontend Developer',
                        applied_user_id: 101,
                        applied_user: '',
                        approved_user_id: 1,
                        approved_user: 'ABC',
                        applied_date: '',
                        approved_date: '',
                        status: 2,
                        status_description: 'Open',
                        resume_attachment_id: 1,
                        attachment_url: '',
                    },
                    {
                        sync_registry_id: 1,
                        vacancy_id: 1,
                        job_id: '1',
                        job_name: 'Backend Developer',
                        applied_user_id: 0,
                        applied_user: 'test',
                        approved_user_id: 1,
                        approved_user: 'Lyca Group',
                        applied_date: '',
                        approved_date: '',
                        status: 0,
                        status_description: 'Open',
                        resume_attachment_id: 1,
                        attachment_url: 'https://www.lycamobile.co.uk/en/',
                    },
                ];

                this.data_source = new MatTableDataSource(data);
                this.data_source.sort = this.sort;
            },
        });
    }
    
    redirectUrl(row: any) {
        window.open(row.attachment_url, '_blank');
    }

    /**
     * to delete job request or application
     *
     * @param job
     */
    deleteJob(job: MyJobs) {
        const dialog_ref = this.confirmation_dialog.open({
            title: 'Remove Jobs',
            message:
                "Are you sure you want to delete this cancel this job application or request? This action cannot be undone. Click 'Confirm' to proceed with the deletion, or 'Cancel' to return to the job details.",
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
     * @param jobs
     *
     */
    openDialog(item: any) {
        this.dialog.open(editAttachmentComponent, {
            width: '800px',
            data: { item },
        });
    }
}
