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
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'app/core/user/user.service';
import { License } from 'app/models/license.types';
import { User } from 'app/models/user.types';
import { EmployeeService } from '../../services/employee.service';
import { Observable } from 'rxjs';
import { CommonResponse } from 'app/models/common-response.types';

@Component({
    selector: 'app-license',
    templateUrl: './license.component.html',
    styleUrls: ['./license.component.scss'],
})
export class LicenseComponent implements OnInit {
    //FormGroup
    license_form: FormGroup;

    constructor(
        private form_builder: FormBuilder,
        private user_service: UserService,
        private employee_service: EmployeeService,
        private dialog_ref: MatDialogRef<LicenseComponent>,
        private snack_bar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA)
        public data: {
            license?: License;
            user: User;
        }
    ) {
        this.license_form = this.form_builder.group({
            license_name: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
        });
    }

    ngOnInit(): void {
        if (this.data.license) {
            this.license_form.patchValue({
                license_name: this.data.license.license_name,
                description: this.data.license.description,
            });
        }
    }

    /**
     * to save license
     *
     * @returns
     */
    saveLicense() {
        if (this.license_form.invalid) {
            return;
        }

        const license: License = {
            description: this.license_form.get('description').value,
            license_name: this.license_form.get('license_name').value,
            license_id: this.data.license
                ? this.data.license.license_id
                : undefined,
        };

        let request: Observable<CommonResponse<License>>;

        if (this.data.license) {
            request = this.employee_service.updateLicense(license);
        } else {
            request = this.employee_service.createNewLicense(license);
        }

        this.license_form.disable();
        request.subscribe({
            next: (res: CommonResponse<License>) => {
                console.log(res);

                this.snack_bar.open(res.message, 'Close', {
                    duration: 2000,
                    panelClass: res.message
                        ? 'success-message'
                        : 'error-message',
                });

                if (res.success) {
                    if (this.data.license) {
                        this.data.user.licenses = this.data.user.licenses.map(
                            (x) => {
                                if (x.license_id === res.data.license_id) {
                                    return res.data;
                                } else {
                                    return x;
                                }
                            }
                        );
                    } else {
                        this.data.user.licenses.push(res.data);
                    }

                    this.user_service.user = this.data.user;
                    this.dialog_ref.close();
                }
            },
            error: () => this.license_form.enable(),
            complete: () => this.license_form.enable(),
        });
    }
}
