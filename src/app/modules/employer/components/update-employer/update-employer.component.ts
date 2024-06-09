/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Inject, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MyAccountService } from '../../services/my-account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'app/models/user.types';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from '@angular/material/dialog';
import { CommonResponse } from 'app/models/common-response.types';
import { UserService } from 'app/core/user/user.service';
import { AttachmentComponent } from 'app/shared/components/attachment/attachment.component';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-update-employer',
    templateUrl: './update-employer.component.html',
    styleUrls: ['./update-employer.component.scss'],
})
export class UpdateEmployerComponent implements OnInit {
    //FormGroup
    employer_form: FormGroup;

    //Variables
    readonly url: string = environment.url;

    constructor(
        private form_builder: FormBuilder,
        private my_account_service: MyAccountService,
        private snack_bar: MatSnackBar,
        private user_service: UserService,
        private dialog_ref: MatDialogRef<UpdateEmployerComponent>,
        private mat_dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: User
    ) {
        this.employer_form = this.form_builder.group({
            company_name: new FormControl('', Validators.required),
            location: new FormControl('', Validators.required),
            logo1: new FormControl('', Validators.required),
            phone_number: new FormControl('', Validators.required),
            logo2: new FormControl(''),
            website_url: new FormControl(''),
            cover_url: new FormControl(''),
            number_of_employees: new FormControl('', Validators.min(1)),
            about_us: new FormControl('', Validators.required),
        });
    }

    ngOnInit(): void {
        if (this.data) {
            this.employer_form.patchValue({
                company_name: this.data.user_details.company_name,
                location: this.data.user_details.location,
                logo1: this.data.user_details.logo1,
                phone_number: this.data.user_details.employer_phone_number,
                logo2: this.data.user_details.logo2,
                website_url: this.data.user_details.website_url,
                cover_url: this.data.user_details.employer_cover_url,
                number_of_employees: this.data.user_details.number_of_employees,
                about_us: this.data.user_details.employer_about_us,
            });
        }
    }

    /**
     * to update employer details
     *
     * @returns
     */
    updateEmployerDetails(): void {
        if (this.employer_form.invalid) {
            return;
        }

        this.employer_form.disable();
        this.my_account_service
            .updateEmployerDetails(this.employer_form.value)
            .subscribe({
                next: (res: CommonResponse<User>) => {
                    console.log(res);

                    this.snack_bar.open(res.message, 'Close', {
                        duration: 2000,
                        panelClass: res.success
                            ? 'success-message'
                            : 'error-message',
                    });

                    if (res.success) {
                        this.user_service.user = null;
                        this.user_service.user = res.data;
                        this.dialog_ref.close();
                    }
                },
            });
    }

    /**
     * to change images (profile picture or cover photo)
     *
     * @param form_control_name
     */
    uploadImage(form_control_name: 'cover_url' | 'logo1'): void {
        const attachment_dialog_ref = this.mat_dialog.open(
            AttachmentComponent,
            {
                disableClose: true,
                data: {
                    user: this.data,
                    is_user_attachment: false,
                    accept: '.jpg',
                },
                width: '500px',
            }
        );

        attachment_dialog_ref.afterClosed().subscribe({
            next: (res: CommonResponse<string>) => {
                if (res && res.success) {
                    this.employer_form
                        .get(form_control_name)
                        ?.setValue(res.data);

                    if (form_control_name === 'cover_url') {
                        this.data.user_details.employer_cover_url = res.data;
                    } else {
                        this.data.user_details.logo1 = res.data;
                    }
                }

                console.log(this.employer_form.value);
            },
        });
    }
}
