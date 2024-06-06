/* eslint-disable quotes */
/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { UserService } from 'app/core/user/user.service';
import { Attachment } from 'app/models/attachment.types';
import { Certification } from 'app/models/certification.types';
import { Education } from 'app/models/education.types';
import { Experience } from 'app/models/experience.types';
import { License } from 'app/models/license.types';
import { OtherAccount } from 'app/models/other-account.types';
import { Reference } from 'app/models/reference.types';
import { Skill } from 'app/models/skill.types';
import { User } from 'app/models/user.types';
import { SharedService } from 'app/shared/services/shared.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { EmployeeService } from '../../services/employee.service';
import { EducationType } from 'app/models/education-type.types';
import { CommonResponse } from 'app/models/common-response.types';
import { Job } from 'app/models/job.types';
import { AccountType } from 'app/models/account-type.types';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { MatDialog } from '@angular/material/dialog';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';
import { ExperienceComponent } from '../experience/experience.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EducationComponent } from '../education/education.component';
import { ArrayTypes, MY_ACCOUNT_DETAILS } from '../../constants/my-account-details.const';


@Component({
    selector: 'app-my-account',
    templateUrl: './my-account.component.html',
    styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit {
    //Variables
    user: User;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private user_service: UserService,
        private change_detector_ref: ChangeDetectorRef,
        private form_builder: FormBuilder,
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
     * to create form-group according to form-array
     *
     * @param array_name
     * @param value
     * @returns
     */
    returnFormGroup(array_name: ArrayTypes, value?: any): FormGroup {
        let form: FormGroup;
        switch (array_name) {
            case 'attachments':
                const attachment: Attachment = value;
                form = this.form_builder.group({
                    attachment_id: new FormControl(
                        value ? attachment.attachment_id : 0
                    ),
                    attachment_url: new FormControl(
                        value ? attachment.attachment_url : '',
                        Validators.required
                    ),
                    attachment_name: new FormControl(
                        value ? attachment.attachment_name : '',
                        Validators.required
                    ),
                });
                break;


            case 'licenses':
                const license: License = value;
                form = this.form_builder.group({
                    license_id: new FormControl(value ? license.license_id : 0),
                    license_name: new FormControl(
                        value ? license.license_name : ''
                    ),
                    description: new FormControl(
                        value ? license.description : ''
                    ),
                });
                break;


            case 'references':
                const reference: Reference = value;
                form = this.form_builder.group({
                    reference_id: new FormControl(
                        value ? reference.reference_id : 0
                    ),
                    reference_name: new FormControl(
                        value ? reference.reference_name : '',
                        Validators.required
                    ),
                    email: new FormControl(
                        value ? reference.email : '',
                        Validators.required
                    ),
                    phone_number: new FormControl(
                        value ? reference.phone_number : '',
                        Validators.required
                    ),
                });
                break;

            case 'skills':
                const skill: Skill = value;
                let skill_data: Skill;
                if (value) {
                    skill_data = this.shared_service.skills.find(
                        (x) => x.skill_id === skill.skill_id
                    );
                }
                form = this.form_builder.group({
                    employee_skill_id: new FormControl(
                        value ? skill.employee_skill_id : 0
                    ),
                    skill: new FormControl(
                        value ? skill_data : '',
                        Validators.required
                    ),
                });
                break;
        }

        return form;
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
                    request = this.shared_service.removeAttachment(
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
        const content_type = MY_ACCOUNT_DETAILS.find(x => x.array_type === array_type);
        const dialog_data = {
            user: this.user
        };

        if (content_type) {
            dialog_data[content_type.key] = data;
            this.mat_dialog.open(content_type.component, {
                disableClose: true,
                width: content_type.width,
                data: dialog_data
            });
        }
    }
}
