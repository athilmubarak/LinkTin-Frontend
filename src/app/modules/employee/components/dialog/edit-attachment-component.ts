/* eslint-disable arrow-parens */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/naming-convention */
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../my-jobs/my-jobs.component';
import { MyJobsService } from '../../services/my-jobs.service';
import { CommonResponse } from 'app/models/common-response.types';
import { Attachment } from 'app/models/attachment.types';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'app/models/user.types';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-dialog',
    templateUrl: './edit-attachment-component.html',
    styleUrls: ['./edit-attachment-component.scss'],
})
export class editAttachmentComponent implements OnInit {
    //Variables
    attachments: Attachment[] = [];
    readonly url: string = environment.url;
    selected_attachment_id: number;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private my_job_service: MyJobsService,
        private user_service: UserService,
        private _changeDetectorRef: ChangeDetectorRef,
        private dialog_ref: MatDialogRef<editAttachmentComponent>,
        private snack_bar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.selected_attachment_id = this.data.item.resume_attachment_id;

        this.user_service.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this.attachments = user.attachments;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * to update attachment
     */
    updateAttachment(): void {
        if ([undefined, null, 0].includes(this.selected_attachment_id)) {
            return;
        }

        this.my_job_service
            .updateAttachment(this.data.item.sync_registry_id, {
                resume_attachment_id: this.selected_attachment_id,
            })
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
                        this.dialog_ref.close({
                            success: true,
                            data: this.attachments.find(
                                (x) =>
                                    x.attachment_id ===
                                    this.selected_attachment_id
                            ),
                        });
                    }
                },
            });
    }

    /**
     * to return attachment name or file type
     *
     * @param attachment
     * @param type
     * @returns
     */
    returnFile(attachment: Attachment, type: 'name' | 'file-type'): string {
        if (type === 'file-type') {
            return attachment.attachment_name
                .slice(attachment.attachment_name.length - 3)
                .toUpperCase();
        } else {
            return attachment.attachment_name.slice(
                0,
                attachment.attachment_name.length - 4
            );
        }
    }

    /**
     * to view attachment
     *
     * @param attachment
     */
    viewAttachment(attachment: Attachment): void {
        window.open(`${this.url}${attachment.attachment_url}`, '_blank');
    }
}
