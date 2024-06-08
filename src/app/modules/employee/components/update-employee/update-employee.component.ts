/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Inject, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { FuseAlertType } from '@fuse/components/alert';
import { UserService } from 'app/core/user/user.service';
import { SharedService } from 'app/shared/services/shared.service';
import { EmployeeService } from '../../services/employee.service';
import { User } from 'app/models/user.types';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from '@angular/material/dialog';
import { CommonResponse } from 'app/models/common-response.types';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'environments/environment';
import { AttachmentComponent } from 'app/shared/components/attachment/attachment.component';

@Component({
    selector: 'app-update-employee',
    templateUrl: './update-employee.component.html',
    styleUrls: ['./update-employee.component.scss'],
})
export class UpdateEmployeeComponent implements OnInit {
    //FormGroup
    employee_form: FormGroup;

    //Variables
    readonly url: string = environment.url;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: User,
        private form_builder: FormBuilder,
        private user_service: UserService,
        public shared_service: SharedService,
        private employee_service: EmployeeService,
        private dialog_ref: MatDialogRef<UpdateEmployeeComponent>,
        private snack_bar: MatSnackBar,
        private mat_dialog: MatDialog
    ) {
        this.employee_form = this.form_builder.group({
            gender_id: new FormControl('', Validators.required),
            country_id: new FormControl('', Validators.required),
            name: new FormControl('', Validators.required),
            phone_number: new FormControl('', Validators.required),
            dob: new FormControl('', Validators.required),
            profile_url: new FormControl('', Validators.required),
            cover_url: new FormControl(''),
            portfolio: new FormControl(''),
            about_us: new FormControl('', Validators.required),
        });

        this.shared_service.getGenders();
        this.shared_service.getCountries();
    }

    ngOnInit(): void {
        this.employee_form.patchValue({
            gender_id: this.data.user_details.gender_id,
            country_id: this.data.user_details.country_id,
            name: this.data.user_details.name,
            phone_number: this.data.user_details.employee_phone_number,
            dob: this.data.user_details.dob,
            profile_url: this.data.user_details.profile_url,
            cover_url: this.data.user_details.employee_cover_url,
            portfolio: this.data.user_details.portfolio,
            about_us: this.data.user_details.employee_about_us,
        });
    }

    /**
     * to update employee details
     *
     * @returns
     */
    updateEmployeeDetails() {
        if (this.employee_form.invalid) {
            return;
        }

        this.employee_form.disable();
        this.employee_service
            .updateEmployeeDetails(
                this.employee_form.value,
                this.data.user_details.user_id
            )
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
                        this.user_service.user = res.data;
                        this.dialog_ref.close();
                    }
                },
                complete: () => this.employee_form.enable(),
                error: (error: any) => {
                    console.log(error);
                    this.employee_form.enable();
                },
            });
    }

    /**
     * to change images (profile picture or cover photo)
     *
     * @param form_control_name
     */
    uploadImage(form_control_name: 'cover_url' | 'profile_url') {
        const attachment_dialog_ref = this.mat_dialog.open(
            AttachmentComponent,
            {
                disableClose: true,
                data: {
                    user: this.data,
                    is_user_attachment: false,
                },
                width: '500px',
            }
        );

        attachment_dialog_ref.afterClosed().subscribe({
            next: (res: CommonResponse<string>) => {
                if (res && res.success) {
                    this.employee_form
                        .get(form_control_name)
                        ?.setValue(res.data);
                    if (form_control_name === 'cover_url') {
                        this.data.user_details.employee_cover_url = res.data;
                    } else {
                        this.data.user_details.profile_url = res.data;
                    }
                }
            },
        });
    }
}
