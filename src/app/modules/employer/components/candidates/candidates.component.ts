/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FuseAlertType } from '@fuse/components/alert';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CommonResponse } from 'app/models/common-response.types';
import { MyJobs } from 'app/models/my-jobs.type';
import { User } from 'app/models/user.types';
import { editAttachmentComponent } from 'app/modules/employee/components/dialog/edit-attachment-component';
import { Subject, takeUntil } from 'rxjs';
import { MyJobsService } from '../../services/my-jobs.service';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-candidates',
    templateUrl: './candidates.component.html',
    styleUrls: ['./candidates.component.scss'],
})
export class CandidatesComponent implements OnInit {
    //Variables
    user: User;
    candidates: MyJobs[] = [];
    filter_type: number = 0;
    readonly url: string = environment.url;

    //Mat-table related variables
    data_source = new MatTableDataSource<MyJobs>();
    displayed_columns: string[] = [
        'sl',
        'jobName',
        'candidate',
        'applied_date',
        'statusName',
        'admin',
    ];
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private myJobs_service: MyJobsService,
        private change_detector_ref: ChangeDetectorRef,
        private confirmation_dialog: FuseConfirmationService,
        private user_service: UserService,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.filter_type = 0;
        this.getVacancies();

        this.user_service.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this.user = user;

                // Mark for check
                this.change_detector_ref.markForCheck();
            });
    }

    /**
     * to get filtered job types
     */
    filterDataByType() {
        let data = [];

        if (this.filter_type === 0) {
            //All
            data = this.candidates;
        } else if (this.filter_type === 1) {
            //Company Initiated Contact
            data = this.candidates.filter(
                (application) =>
                    application.applied_user_id ===
                    this.user.user_details.user_id
            );
        } else {
            //Candidate Applications
            data = this.candidates.filter(
                (application) =>
                    application.approved_user_id ===
                    this.user.user_details.user_id
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
        this.candidates = [];

        this.myJobs_service.getAllJobVacancies().subscribe({
            next: (res: CommonResponse<MyJobs[]>) => {
                console.log(res);
                this.data_source = new MatTableDataSource(res.data);
                this.data_source.sort = this.sort;
                this.candidates = res.data;
            },
        });
    }

    redirectUrl(row: any) {
        window.open(this.url + row.attachment_url, '_blank');
    }

    /**
     * to delete jobs
     *
     * @param jobs
     */
    deleteJob(job: MyJobs) {
        const dialog_ref = this.confirmation_dialog.open({
            title: 'Remove Job Request',
            message:
                "Are you sure you want to delete this job request ? This action cannot be undone. Click 'Confirm' to proceed with the deletion, or 'Cancel' to return to the job request.",
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

                                if (res.success) {
                                    const index = this.candidates.findIndex(
                                        (x) =>
                                            x.sync_registry_id ===
                                            job.sync_registry_id
                                    );

                                    if (index >= 0) {
                                        this.candidates.splice(index, 1);
                                        this.filterDataByType();
                                    }
                                }
                            },
                        });
                }
            },
        });
    }
}
