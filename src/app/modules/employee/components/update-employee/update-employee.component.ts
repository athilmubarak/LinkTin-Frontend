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
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonResponse } from 'app/models/common-response.types';

@Component({
    selector: 'app-update-employee',
    templateUrl: './update-employee.component.html',
    styleUrls: ['./update-employee.component.scss'],
})
export class UpdateEmployeeComponent implements OnInit {
    //FormGroup
    employee_form: FormGroup;

    //Variables
    show_alert: boolean;
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: User,
        private form_builder: FormBuilder,
        private user_service: UserService,
        private shared_service: SharedService,
        private employee_service: EmployeeService,
        private dialog_ref: MatDialogRef<UpdateEmployeeComponent>
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

                    if (res.success) {
                        this.user_service.user = res.data;
                        this.dialog_ref.close();
                    } else {
                        this.show_alert = true;
                        this.alert = {
                            type: 'error',
                            message: res.message,
                        };
                    }
                },
                complete: () => this.employee_form.enable(),
                error: (error: any) => {
                    console.log(error);
                    this.employee_form.enable();
                },
            });
    }
}
