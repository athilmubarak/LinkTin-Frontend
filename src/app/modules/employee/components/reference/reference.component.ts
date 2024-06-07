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
import { Reference } from 'app/models/reference.types';
import { User } from 'app/models/user.types';
import { EmployeeService } from '../../services/employee.service';
import { Observable } from 'rxjs';
import { CommonResponse } from 'app/models/common-response.types';

@Component({
    selector: 'app-reference',
    templateUrl: './reference.component.html',
    styleUrls: ['./reference.component.scss'],
})
export class ReferenceComponent implements OnInit {
    //FormGroup
    reference_form: FormGroup;

    constructor(
        private form_builder: FormBuilder,
        private user_service: UserService,
        private employee_service: EmployeeService,
        private dialog_ref: MatDialogRef<ReferenceComponent>,
        private snack_bar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA)
        public data: {
            reference?: Reference;
            user: User;
        }
    ) {
        this.reference_form = this.form_builder.group({
            reference_name: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
            phone_number: new FormControl('', Validators.required),
        });
    }

    ngOnInit(): void {
        if (this.data.reference) {
            this.reference_form.patchValue({
                reference_name: this.data.reference.reference_name,
                email: this.data.reference.email,
                phone_number: this.data.reference.phone_number,
            });
        }
    }

    /**
     * to save reference
     * 
     * @returns 
     */
    saveReference() {
        if (this.reference_form.invalid) {
            return;
        }

        const reference: Reference = {
            email: this.reference_form.get('email').value,
            phone_number: this.reference_form.get('phone_number').value,
            reference_name: this.reference_form.get('reference_name').value,
            reference_id: this.data.reference
                ? this.data.reference.reference_id
                : undefined,
        };

        let request: Observable<CommonResponse<Reference>>;

        if (this.data.reference) {
            request = this.employee_service.updateReference(reference);
        } else {
            request = this.employee_service.addNewReference(reference);
        }

        this.reference_form.disable();
        request.subscribe({
            next: (res: CommonResponse<Reference>) => {
                console.log(res);

                this.snack_bar.open(res.message, 'Close', {
                    duration: 2000,
                    panelClass: res.data ? 'success-message' : 'error-message',
                });

                if (res.success) {
                    if (this.data.reference) {
                        this.data.user.references =
                            this.data.user.references.map((x) => {
                                if (x.reference_id === res.data.reference_id) {
                                    return res.data;
                                } else {
                                    return x;
                                }
                            });
                    } else {
                        this.data.user.references.push(res.data);
                    }

                    this.user_service.user = this.data.user;
                    this.dialog_ref.close();
                }
            },
            error: () => this.reference_form.enable(),
            complete: () => this.reference_form.enable(),
        });
    }
}
