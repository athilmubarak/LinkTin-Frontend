/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Inject, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'app/core/user/user.service';
import { CommonResponse } from 'app/models/common-response.types';
import { OtherAccount } from 'app/models/other-account.types';
import { User } from 'app/models/user.types';
import { SharedService } from 'app/shared/services/shared.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-other-account',
    templateUrl: './other-account.component.html',
    styleUrls: ['./other-account.component.scss'],
})
export class OtherAccountComponent implements OnInit {
    //FormGroup
    account_form: FormGroup;

    constructor(
        private form_builder: FormBuilder,
        private user_service: UserService,
        public shared_service: SharedService,
        private dialog_ref: MatDialogRef<OtherAccountComponent>,
        private snack_bar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA)
        public data: {
            other_account?: OtherAccount;
            user: User;
        }
    ) {
        this.shared_service.getAccountTypes();

        this.account_form = this.form_builder.group({
            account_type_id: new FormControl('', Validators.required),
            account_url: new FormControl('', Validators.required),
        });
    }

    ngOnInit(): void {
        if (this.data.other_account) {
            this.account_form.patchValue({
                account_type_id: this.data.other_account.account_type_id,
                account_url: this.data.other_account.account_url,
            });
        }
    }

    /**
     * to save other account
     */
    saveOtherAccount() {
        if (this.account_form.invalid) {
            return;
        }

        const account: OtherAccount = {
            account_url: this.account_form.get('account_url').value,
            account_type_id: this.account_form.get('account_type_id').value,
            other_account_id: this.data.other_account
                ? this.data.other_account.other_account_id
                : undefined,
        };

        let request: Observable<CommonResponse<OtherAccount>>;

        if (this.data.other_account) {
            request = this.shared_service.updateOtherAccount(account);
        } else {
            request = this.shared_service.addNewOtherAccount(account);
        }

        this.account_form.disable();
        request.subscribe({
            next: (res: CommonResponse<OtherAccount>) => {
                console.log(res);

                this.snack_bar.open(res.message, 'Close', {
                    duration: 2000,
                    panelClass: res.success
                        ? 'success-message'
                        : 'error-message',
                });

                if (res.success) {
                    if (this.data.other_account) {
                        this.data.user.other_accounts =
                            this.data.user.other_accounts.map((x) => {
                                if (
                                    x.other_account_id ===
                                    res.data.other_account_id
                                ) {
                                    return res.data;
                                } else {
                                    return x;
                                }
                            });
                    } else {
                        this.data.user.other_accounts.push(res.data);
                    }

                    this.user_service.user = this.data.user;
                    this.dialog_ref.close();
                }
            },
            error: () => this.account_form.enable(),
            complete: () => this.account_form.enable(),
        });
    }
}
