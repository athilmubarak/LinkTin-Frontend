/* eslint-disable quotes */
/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/models/user.types';
import { SharedService } from 'app/shared/services/shared.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { EmployeeService } from '../../services/employee.service';
import { CommonResponse } from 'app/models/common-response.types';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { MatDialog } from '@angular/material/dialog';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
    ArrayTypes,
    MY_ACCOUNT_DETAILS,
} from '../../constants/my-account-details.const';
import { Attachment } from 'app/models/attachment.types';
import { environment } from 'environments/environment';
import { OtherAccount } from 'app/models/other-account.types';

@Component({
    selector: 'app-my-account',
    templateUrl: './my-account.component.html',
    styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit {
    //Variables
    user: User;
    readonly url: string = environment.url;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private user_service: UserService,
        private change_detector_ref: ChangeDetectorRef,
        public shared_service: SharedService,
        private employee_service: EmployeeService,
        private confirm_service: FuseConfirmationService,
        private mat_dialog: MatDialog,
        private snack_bar: MatSnackBar
    ) {
        this.shared_service.getSkills();
    }

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
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    /**
     * to remove details
     *
     * @param array_type
     * @param index
     */
    removeDetails(array_type: ArrayTypes, index: number) {
        if (index >= 0) {
            let request: Observable<CommonResponse<number>>;

            switch (array_type) {
                case 'attachments':
                    request = this.shared_service.removeAttachment(
                        this.user.attachments[index].attachment_id
                    );
                    break;

                case 'certifications':
                    request = this.employee_service.removeCertification(
                        this.user.certifications[index].certification_id
                    );
                    break;

                case 'educations':
                    request = this.employee_service.removeEducation(
                        this.user.educations[index].id
                    );
                    break;

                case 'experiences':
                    request = this.employee_service.removeExperience(
                        this.user.experiences[index].id
                    );
                    break;

                case 'licenses':
                    request = this.employee_service.removeLicense(
                        this.user.licenses[index].license_id
                    );
                    break;

                case 'other_accounts':
                    request = this.shared_service.removeOtherAccount(
                        this.user.other_accounts[index].other_account_id
                    );
                    break;

                case 'references':
                    request = this.employee_service.removeReference(
                        this.user.references[index].reference_id
                    );
                    break;

                case 'skills':
                    request = this.employee_service.removeSkill(
                        this.user.skill[index].employee_skill_id
                    );
                    break;
            }

            if (request) {
                const dialog_ref = this.confirm_service.open({
                    title: 'Confirmation',
                    message: `Do you want to remove this ${array_type.slice(
                        0,
                        array_type.length - 1
                    )}. This cannot be undone.`,
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
                            request.subscribe({
                                next: (res: CommonResponse<number>) => {
                                    console.log(res);

                                    this.snack_bar.open(res.message, 'Close', {
                                        duration: 2000,
                                        panelClass: res.success
                                            ? 'success-message'
                                            : 'error-message',
                                    });

                                    if (res.success) {
                                        this.user[
                                            array_type === 'skills'
                                                ? 'skill'
                                                : array_type
                                        ].splice(index, 1);
                                        this.user_service.user = this.user;
                                    }
                                },
                                error: (error: any) =>
                                    this.showErrorMessage(error),
                            });
                        }
                    },
                });
            }
        }
    }

    /**
     * to show common error message
     */
    showErrorMessage(error: any) {
        console.log(error);

        this.snack_bar.open(
            'Your request cannot be processed at this time. Please try again later.',
            'Close',
            {
                duration: 2000,
                panelClass: 'error-message',
            }
        );
    }

    /**
     * to open update employee dialog
     */
    onClickEmployeeDetails() {
        this.mat_dialog.open(UpdateEmployeeComponent, {
            disableClose: true,
            width: '700px',
            data: this.user,
        });
    }

    /**
     * to add or update details
     *
     * @param array_type
     * @param data
     */
    onClickDetails(array_type: ArrayTypes, data?: any) {
        const content_type = MY_ACCOUNT_DETAILS.find(
            (x) => x.array_type === array_type
        );
        const dialog_data = {
            user: this.user,
        };

        if (content_type) {
            if (array_type !== 'skills') {
                dialog_data[content_type.key] =
                    array_type === 'attachments' ? true : data;
            }

            if (array_type === 'attachments') {
                dialog_data['accept'] = '.jpg';
            }

            this.mat_dialog.open(content_type.component, {
                disableClose: true,
                width: content_type.width,
                data: dialog_data,
            });
        }
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
    viewAttachment(attachment: Attachment) {
        window.open(`${this.url}${attachment.attachment_url}`, '_blank');
    }

    /**
     * to view account
     *
     * @param account
     */
    goToAccount(account: OtherAccount) {
        window.open(account.account_url, '_blank');
    }
}
