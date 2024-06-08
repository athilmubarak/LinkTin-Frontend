/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable arrow-parens */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/naming-convention */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UserService } from 'app/core/user/user.service';
import { CommonResponse } from 'app/models/common-response.types';
import { User } from 'app/models/user.types';
import {
    ArrayTypes,
    MY_ACCOUNT_DETAILS,
} from 'app/modules/employee/constants/my-account-details.const';
import { SharedService } from 'app/shared/services/shared.service';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-my-account',
    templateUrl: './my-account.component.html',
    styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit {
    //Variables
    user_details: User;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private user_service: UserService,
        private change_detector_ref: ChangeDetectorRef,
        private mat_dialog: MatDialog,
        private shared_service: SharedService,
        private confirm_service: FuseConfirmationService,
        private snack_bar: MatSnackBar
    ) {}

    ngOnInit(): void {
        // Subscribe to user changes
        this.user_service.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe({
                next: (user: User) => {
                    this.user_details = user;
                    console.log(user);

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
            user: this.user_details,
        };

        if (content_type) {
            dialog_data[content_type.key] =
                array_type === 'attachments' ? true : data;
            this.mat_dialog.open(content_type.component, {
                disableClose: true,
                width: content_type.width,
                data: dialog_data,
            });
        }
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
                        this.user_details.attachments[index].attachment_id
                    );
                    break;

                case 'other_accounts':
                    request = this.shared_service.removeAttachment(
                        this.user_details.other_accounts[index].other_account_id
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
                                        this.user_details[array_type].splice(index, 1);
                                        this.user_service.user = this.user_details;
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
}
