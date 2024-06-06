/* eslint-disable no-trailing-spaces */
/* eslint-disable arrow-parens */
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
import { Education } from 'app/models/education.types';
import { User } from 'app/models/user.types';
import { SharedService } from 'app/shared/services/shared.service';
import { EmployeeService } from '../../services/employee.service';
import { EducationType } from 'app/models/education-type.types';
import { CommonResponse } from 'app/models/common-response.types';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-education',
    templateUrl: './education.component.html',
    styleUrls: ['./education.component.scss'],
})
export class EducationComponent implements OnInit {
    //FormGroup
    education_form: FormGroup;

    //Variables
    education_types: EducationType[] = [];
    all_education_types: EducationType[] = [];

    constructor(
        private form_builder: FormBuilder,
        private user_service: UserService,
        private employee_service: EmployeeService,
        private shared_service: SharedService,
        private dialog_ref: MatDialogRef<EducationComponent>,
        private snack_bar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA)
        public data: {
            education?: Education;
            user: User;
        }
    ) {
        this.education_form = this.form_builder.group({
            education_type: new FormControl('', Validators.required),
            institution: new FormControl('', Validators.required),
            academic_year: new FormControl('', Validators.required),
            display_order: new FormControl(1),
        });
    }

    ngOnInit(): void {
        this.getEducationTypes();
    }

    /**
     * to get education type and if edit then patch values to form
     */
    getEducationTypes() {
        this.education_types = [];
        this.all_education_types = [];

        this.employee_service.getEducationTypes().subscribe({
            next: (res: CommonResponse<EducationType[]>) => {
                console.log(res);

                this.education_types = res.data;
                this.all_education_types = res.data;

                if (this.data.education) {
                    const education_type = res.data.find(
                        (x) =>
                            x.education_type_id ===
                            this.data.education.education_type_id
                    );

                    this.education_form.patchValue({
                        education_type: education_type,
                        institution: this.data.education.institution,
                        academic_year: this.data.education.academic_year,
                        display_order: this.data.education.display_order,
                    });
                }
            },
        });
    }

    /**
     * to filter jobs
     *
     * @param value
     */
    filterEducationType(value: string) {
        if ([undefined, null, '', ' '].includes(value)) {
            this.education_types = [...this.all_education_types];
        } else {
            this.education_types = this.all_education_types.filter((x) =>
                x.description.toLowerCase().includes(value.toLowerCase())
            );
        }
    }

    /**
     * display function for job auto-complete
     *
     * @param education
     * @returns
     */
    displayFn(education: Education): string {
        return education && education.description ? education.description : '';
    }

    /**
     * to show or hide job save button
     *
     * @returns
     */
    showDoneButtonForEducationType(): boolean {
        return (
            ![null, undefined, '', ' '].includes(
                this.education_form.get('education_type').value
            ) && this.education_types.length === 0
        );
    }

    /**
     * to save new job
     */
    saveNewEductionType() {
        // this.shared_service
        //     .createNewJob({ name: this.experience_form.get('job').value })
        //     .subscribe({
        //         next: (res: CommonResponse<Job>) => {
        //             console.log(res);
        //             if (res.success) {
        //                 this.experience_form.get('job').setValue(res.data);
        //                 this.jobs = [res.data];
        //                 this.shared_service.jobs.push(res.data);
        //             }
        //         },
        //     });
    }

    /**
     * to save education
     * 
     * @returns 
     */
    saveEducation() {
        if (this.education_form.invalid) {
            return;
        }

        let request: Observable<CommonResponse<Education>>;
        const education: Education = {
            academic_year: this.education_form.get('academic_year').value,
            display_order: this.education_form.get('display_order').value,
            institution: this.education_form.get('institution').value,
            education_type_id:
                this.education_form.get('education_type').value
                    ?.education_type_id,
        };

        if (this.data.education) {
            request = this.employee_service.updateEducation(
                education,
                this.data.education.id
            );
        } else {
            request = this.employee_service.createEducation(education);
        }

        request.subscribe({
            next: (res: CommonResponse<Education>) => {
                console.log(res);
                this.snack_bar.open(res.message, 'Close', {
                    duration: 2000,
                    panelClass: res.success
                        ? 'success-message'
                        : 'error-message',
                });

                if (res.success) {
                    this.data.user.educations = this.data.user.educations.map(
                        (x) => {
                            if (x.id === res.data.id) {
                                return res.data;
                            } else {
                                return x;
                            }
                        }
                    );

                    this.user_service.user = this.data.user;
                    this.dialog_ref.close();
                }
            },
        });
    }
}
