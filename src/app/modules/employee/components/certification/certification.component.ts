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
import { Certification } from 'app/models/certification.types';
import { User } from 'app/models/user.types';
import { EmployeeService } from '../../services/employee.service';
import { Observable } from 'rxjs';
import { CommonResponse } from 'app/models/common-response.types';

@Component({
    selector: 'app-certification',
    templateUrl: './certification.component.html',
    styleUrls: ['./certification.component.scss'],
})
export class CertificationComponent implements OnInit {
    //FormGroup
    certificate_form: FormGroup;

    constructor(
        private form_builder: FormBuilder,
        private user_service: UserService,
        private employee_service: EmployeeService,
        private dialog_ref: MatDialogRef<CertificationComponent>,
        private snack_bar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA)
        public data: {
            certification?: Certification;
            user: User;
        }
    ) {
        this.certificate_form = this.form_builder.group({
            certificate_name: new FormControl('', Validators.required),
            description: new FormControl(''),
        });
    }

    ngOnInit(): void {
        if (this.data.certification) {
            this.certificate_form.patchValue({
                certificate_name: this.data.certification.certificate_name,
                description: this.data.certification.description,
            });
        }
    }

    /**
     * to save certifications
     * 
     * @returns 
     */
    saveCertification() {
        if (this.certificate_form.invalid) {
            return;
        }

        const certification: Certification = {
            certificate_name:
                this.certificate_form.get('certificate_name').value,
            description: this.certificate_form.get('description').value,
            certification_id: this.data.certification
                ? this.data.certification.certification_id
                : undefined,
        };

        let request: Observable<CommonResponse<Certification>>;

        if (this.data.certification) {
            request = this.employee_service.updateCertification(certification);
        } else {
            request =
                this.employee_service.createNewCertification(certification);
        }

        request.subscribe({
            next: (res: CommonResponse<Certification>) => {
                console.log(res);

                this.snack_bar.open(res.message, 'Close', {
                    duration: 2000,
                    panelClass: res.data ? 'success-message' : 'error-message',
                });

                if (res.success) {
                    if (this.data.certification) {
                        this.data.user.certifications =
                            this.data.user.certifications.map((x) => {
                                if (
                                    x.certification_id ===
                                    certification.certification_id
                                ) {
                                    return res.data;
                                } else {
                                    return x;
                                }
                            });
                    } else {
                        this.data.user.certifications.push(res.data);
                    }

                    this.user_service.user = this.data.user;
                    this.dialog_ref.close();
                }
            },
        });
    }
}
