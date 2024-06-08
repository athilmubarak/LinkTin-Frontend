/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/member-ordering */
import {
    Component,
    ElementRef,
    Inject,
    OnInit,
    ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'app/core/user/user.service';
import { Attachment } from 'app/models/attachment.types';
import { CommonResponse } from 'app/models/common-response.types';
import { User } from 'app/models/user.types';
import { SharedService } from 'app/shared/services/shared.service';

@Component({
    selector: 'app-attachment',
    templateUrl: './attachment.component.html',
    styleUrls: ['./attachment.component.scss'],
})
export class AttachmentComponent implements OnInit {
    //Variable
    files: any[] = [];
    file_url: string;
    file_type: 'PDF' | 'JPG';

    @ViewChild('fileDropRef', { static: false }) fileDropEl: ElementRef;

    file_name: FormControl;

    constructor(
        private shared_service: SharedService,
        private user_service: UserService,
        private dialog_ref: MatDialogRef<AttachmentComponent>,
        private snack_bar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA)
        public data: {
            user: User;
            is_user_attachment: boolean;
        }
    ) {
        this.file_name = new FormControl('', Validators.required);
    }

    ngOnInit(): void {}

    /**
     * on file drop handler
     */
    onFileDropped($event) {
        this.prepareFilesList($event);
    }

    /**
     * handle file from browsing
     */
    fileBrowseHandler(files) {
        this.prepareFilesList(files);
    }

    /**
     * Convert Files list to normal array list
     *
     * @param files (Files List)
     */
    prepareFilesList(files: Array<any>) {
        for (const item of files) {
            this.files.push(item);
            this.file_name.setValue(item.name);
            this.file_type = item.type === 'application/pdf' ? 'PDF' : 'JPG';
        }

        if (files.length > 0) {
            const form_data = new FormData();
            form_data.append('file', files[0]);

            this.shared_service.uploadFile(form_data).subscribe({
                next: (res: CommonResponse<string>) => {
                    console.log(res);

                    if (res.success) {
                        this.file_url = res.data;
                    }
                },
            });
        }
    }

    /**
     * to save attachment
     */
    saveAttachment() {
        if ([undefined, null, '', ' '].includes(this.file_url)) {
            return;
        }

        if (this.data.is_user_attachment) {
            if (this.files.length === 0 || this.file_name.invalid) {
                return;
            }

            const attachment: Attachment = {
                attachment_id: undefined,
                attachment_name: this.file_name.value,
                attachment_url: this.file_url,
            };

            this.shared_service.createNewAttachment(attachment).subscribe({
                next: (res: CommonResponse<Attachment>) => {
                    console.log(res);

                    this.snack_bar.open(res.message, 'Close', {
                        duration: 2000,
                        panelClass: res.success
                            ? 'success-message'
                            : 'error-message',
                    });

                    if (res.success) {
                        this.data.user.attachments.push(res.data);

                        this.user_service.user = this.data.user;
                        this.dialog_ref.close();
                    }
                },
            });
        } else {
            this.dialog_ref.close({ success: true, data: this.file_url });
        }
    }
}
