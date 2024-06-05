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
import { UpdateUser } from 'app/models/update-user.types';
import { AuthService } from 'app/core/auth/auth.service';
import { FuseAlertType } from '@fuse/components/alert';

export type ArrayTypes =
    | 'attachments'
    | 'certifications'
    | 'educations'
    | 'experiences'
    | 'licenses'
    | 'other_accounts'
    | 'references'
    | 'skills';

@Component({
    selector: 'app-my-account',
    templateUrl: './my-account.component.html',
    styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit {
    //FormGroup
    employee_form: FormGroup;

    //Variables
    is_edit: boolean;
    user: User;
    education_types: EducationType[];
    show_alert: boolean = false;
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private user_service: UserService,
        private change_detector_ref: ChangeDetectorRef,
        private form_builder: FormBuilder,
        public shared_service: SharedService,
        private employee_service: EmployeeService,
        private confirm_service: FuseConfirmationService,
        private auth_service: AuthService
    ) {
        this.shared_service.getGenders();
        this.shared_service.getJobs();
        this.shared_service.getSkills();
        this.shared_service.getAccountTypes();
        this.shared_service.getCountries();
    }

    ngOnInit(): void {
        this.is_edit = false;
        this.employee_form = this.form_builder.group({
            gender_id: new FormControl('', Validators.required),
            country_id: new FormControl('', Validators.required),
            name: new FormControl('', Validators.required),
            phone_number: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
            dob: new FormControl('', Validators.required),
            profile_url: new FormControl(''),
            cover_url: new FormControl(''),
            portfolio: new FormControl(''),
            about_us: new FormControl('', Validators.required),
            experiences: this.form_builder.array([]),
            educations: this.form_builder.array([]),
            skills: this.form_builder.array([]),
            certifications: this.form_builder.array([]),
            licenses: this.form_builder.array([]),
            references: this.form_builder.array([]),
            other_accounts: this.form_builder.array([]),
            attachments: this.form_builder.array([]),
        });
        // Subscribe to user changes
        this.user_service.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe({
                next: (user: User) => {
                    this.setEmployeeFormValue(user);
                    this.user = user;

                    // Mark for check
                    this.change_detector_ref.markForCheck();
                },
            });

        this.getEducationTypes();
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
     * to patch values to employee_form
     *
     * @param user
     */
    setEmployeeFormValue(user: User) {
        this.employee_form.patchValue({
            gender_id: user.user_details.gender_id,
            country_id: user.user_details.country_id,
            name: user.user_details.name,
            phone_number: user.user_details.employee_phone_number,
            email: user.user_details.employee_email,
            dob: user.user_details.dob,
            profile_url: user.user_details.profile_url,
            cover_url: user.user_details.employee_cover_url,
            portfolio: user.user_details.portfolio,
            about_us: user.user_details.employee_about_us,
        });

        this.getFormArray('attachments').clear();
        if (user.attachments.length > 0) {
            //attachments
            user.attachments.forEach((attachment: Attachment) => {
                this.addRow(
                    'attachments',
                    this.returnFormGroup('attachments', attachment)
                );
            });
        }

        this.getFormArray('certifications').clear();
        if (user.certifications.length > 0) {
            //certifications
            user.certifications.forEach((certification: Certification) => {
                this.addRow(
                    'certifications',
                    this.returnFormGroup('certifications', certification)
                );
            });
        }

        this.getFormArray('educations').clear();
        if (user.educations.length > 0) {
            //educations
            user.educations.forEach((education: Education) => {
                this.addRow(
                    'educations',
                    this.returnFormGroup('educations', education)
                );
            });
        }

        this.getFormArray('experiences').clear();
        if (user.experiences.length > 0) {
            //experiences
            user.experiences.forEach((experience: Experience) => {
                this.addRow(
                    'experiences',
                    this.returnFormGroup('experiences', experience)
                );
            });
        }

        this.getFormArray('licenses').clear();
        if (user.licenses.length > 0) {
            //licenses
            user.licenses.forEach((license: License) => {
                this.addRow(
                    'licenses',
                    this.returnFormGroup('licenses', license)
                );
            });
        }

        this.getFormArray('other_accounts').clear();
        if (user.other_accounts.length > 0) {
            //other_accounts
            user.other_accounts.forEach((other_account: OtherAccount) => {
                this.addRow(
                    'other_accounts',
                    this.returnFormGroup('other_accounts', other_account)
                );
            });
        }

        this.getFormArray('references').clear();
        if (user.references.length > 0) {
            //references
            user.references.forEach((reference: Reference) => {
                this.addRow(
                    'references',
                    this.returnFormGroup('references', reference)
                );
            });
        }

        this.getFormArray('skills').clear();
        if (user.skill.length > 0) {
            //skills
            user.skill.forEach((skill: Skill) => {
                this.addRow('skills', this.returnFormGroup('skills', skill));
            });
        }
    }

    /**
     * getter functions for all form arrays
     *
     * @param array_name
     */
    getFormArray(array_name: ArrayTypes): FormArray {
        return this.employee_form.get(array_name) as FormArray;
    }

    /**
     * to add row to an array
     *
     * @param array_name
     * @param form
     */
    addRow(array_name: ArrayTypes, form: FormGroup) {
        this.getFormArray(array_name).push(form);
    }

    /**
     * to remove one row from an array
     *
     * @param array_name
     * @param index
     */
    removeRow(array_name: ArrayTypes, index: number) {
        this.getFormArray(array_name).removeAt(index);
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

            case 'certifications':
                const certification: Certification = value;
                form = this.form_builder.group({
                    certification_id: new FormControl(
                        value ? certification.certification_id : 0
                    ),
                    certificate_name: new FormControl(
                        value ? certification.certificate_name : '',
                        Validators.required
                    ),
                    description: new FormControl(
                        value ? certification.description : ''
                    ),
                });
                break;

            case 'educations':
                const education: Education = value;
                let education_type;
                if (value) {
                    education_type = this.education_types.find(
                        (x) =>
                            x.education_type_id === education.education_type_id
                    );
                }
                form = this.form_builder.group({
                    id: new FormControl(education.id),
                    education_type: new FormControl(
                        value ? education_type : '',
                        Validators.required
                    ),
                    institution: new FormControl(
                        value ? education.institution : '',
                        Validators.required
                    ),
                    academic_year: new FormControl(
                        value ? education.academic_year : '',
                        Validators.required
                    ),
                    display_order: new FormControl(
                        value
                            ? education.display_order
                            : this.getFormArray('educations').length + 1
                    ),
                });
                break;

            case 'experiences':
                const experience: Experience = value;
                let job: Job;
                if (value) {
                    job = this.shared_service.jobs.find(
                        (x) => x.job_id === experience.job_id
                    );
                }
                form = this.form_builder.group({
                    id: new FormControl(value ? experience.id : 0),
                    job: new FormControl(value ? job : '', Validators.required),
                    position: new FormControl(
                        value ? experience.position : '',
                        Validators.required
                    ),
                    company: new FormControl(value ? experience.company : ''),
                    location: new FormControl(value ? experience.location : ''),
                    joining_date: new FormControl(
                        value ? experience.joining_date : '',
                        Validators.required
                    ),
                    relieving_date: new FormControl(
                        value ? experience.relieving_date : ''
                    ),
                    is_currently_working: new FormControl(
                        value ? experience.is_currently_working : false
                    ),
                    display_order: new FormControl(
                        value
                            ? experience.display_order
                            : this.getFormArray('experiences').length + 1
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

            case 'other_accounts':
                const other_account: OtherAccount = value;
                let account_type: AccountType;
                if (value) {
                    account_type = this.shared_service.account_types.find(
                        (x) =>
                            x.account_type_id === other_account.account_type_id
                    );
                }
                form = this.form_builder.group({
                    other_account_id: new FormControl(
                        value ? other_account.other_account_id : 0
                    ),

                    account_type: new FormControl(
                        value ? account_type : '',
                        Validators.required
                    ),
                    account_url: new FormControl(
                        value ? other_account.account_url : '',
                        Validators.required
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
     * to get education types
     */
    getEducationTypes() {
        this.education_types = [];

        this.employee_service.getEducationTypes().subscribe({
            next: (res: CommonResponse<EducationType[]>) => {
                this.education_types = res.data;
            },
        });
    }

    /**
     * getter function for employee form
     */
    get getFormValue() {
        return this.employee_form.value;
    }

    /**
     * to cancel edit
     */
    onClickClose() {
        const dialog_ref = this.confirm_service.open({
            title: 'Confirmation',
            message: 'Do you confirm your action ?',
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
                    this.is_edit = false;
                    this.setEmployeeFormValue(this.user);
                }
            },
        });
    }

    /**
     * to save employee details
     *
     * @returns
     */
    saveEmployeeDetails() {
        if (this.employee_form.invalid) {
            return;
        }

        const educations = this.getFormValue.educations.map((x) => ({
            id: x.id,
            education_type_id: x.education_type.education_type_id,
            institution: x.institution,
            academic_year: x.academic_year,
            display_order: x.display_order,
        }));

        const experiences = this.getFormValue.experiences.map((x) => ({
            id: x.id,
            job_id: x.job.job_id,
            company: x.company,
            location: x.location,
            joining_date: x.joining_date,
            relieving_date: x.relieving_date,
            is_currently_working: x.is_currently_working ? 1 : 0,
            display_order: x.display_order,
        }));

        const other_accounts = this.getFormValue.other_accounts.map((x) => ({
            other_account_id: x.other_account_id,
            account_type_id: x.account_type.account_type_id,
            account_url: x.account_url,
        }));

        const skills = this.getFormValue.skills.map((x) => ({
            employee_skill_id: x.employee_skill_id,
            skill_id: x.skill.skill_id,
        }));

        const user_details: UpdateUser = {
            user_id: this.user.user_details.user_id,
            user_type_id: this.auth_service.userType,
            user_details: {
                gender_id: this.getFormValue.gender_id,
                country_id: this.getFormValue.country_id,
                personal_info_id: this.user.user_details.personal_info_id,
                name: this.getFormValue.name,
                phone_number: this.getFormValue.phone_number,
                profile_url: this.getFormValue.profile_url,
                cover_url: this.getFormValue.cover_url,
                portfolio: this.getFormValue.portfolio,
                about_us: this.getFormValue.about_us,
                dob: this.getFormValue.dob,
            },
            attachments: this.getFormValue.attachments,
            certifications: this.getFormValue.certifications,
            educations: educations,
            experiences: experiences,
            licenses: this.getFormValue.licenses,
            other_accounts: other_accounts,
            references: this.getFormValue.references,
            skills: skills,
        };

        this.employee_form.disable();

        this.shared_service.updateUserDetails(user_details).subscribe({
            next: (res: CommonResponse<User>) => {
                console.log(res);

                this.show_alert = true;
                this.alert = {
                    type: res.success ? 'success' : 'error',
                    message: res.message,
                };

                if (res.success) {
                    this.user_service.user = res.data;
                    this.is_edit = false;
                }
            },
            complete: () => this.employee_form.enable(),
            error: (error: any) => {
                this.employee_form.enable();
                this.showErrorMessage(error);
            },
        });
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
                    if (
                        this.getFormValue.attachments[index].attachment_id > 0
                    ) {
                        request = this.shared_service.removeAttachment(
                            this.getFormValue.attachments[index].attachment_id
                        );
                    }
                    break;

                case 'certifications':
                    if (
                        this.getFormValue.certifications[index]
                            .certification_id > 0
                    ) {
                        request = this.employee_service.removeCertification(
                            this.getFormValue.certifications[index]
                                .certification_id
                        );
                    }
                    break;

                case 'educations':
                    if (this.getFormValue.educations[index].id > 0) {
                        request = this.employee_service.removeEducation(
                            this.getFormValue.educations[index].id
                        );
                    }
                    break;

                case 'experiences':
                    if (this.getFormValue.experiences[index].id > 0) {
                        request = this.employee_service.removeExperience(
                            this.getFormValue.experiences[index].id
                        );
                    }
                    break;

                case 'licenses':
                    if (this.getFormValue.licenses[index].license_id > 0) {
                        request = this.employee_service.removeLicense(
                            this.getFormValue.licenses[index].license_id
                        );
                    }
                    break;

                case 'other_accounts':
                    if (
                        this.getFormValue.other_accounts[index]
                            .other_account_id > 0
                    ) {
                        request = this.shared_service.removeAttachment(
                            this.getFormValue.other_accounts[index]
                                .other_account_id
                        );
                    }
                    break;

                case 'references':
                    if (this.getFormValue.references[index].reference_id > 0) {
                        request = this.employee_service.removeReference(
                            this.getFormValue.references[index].reference_id
                        );
                    }
                    break;

                case 'skills':
                    if (this.getFormValue.skills[index].employee_skill_id > 0) {
                        request = this.employee_service.removeSkill(
                            this.getFormValue.skills[index].employee_skill_id
                        );
                    }
                    break;
            }

            if (request) {
                const dialog_ref = this.confirm_service.open({
                    title: 'Confirmation',
                    message: `Do you want to remove this ${array_type.slice(
                        0,
                        array_type.length - 2
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

                                    this.show_alert = true;
                                    this.alert = {
                                        type: res.success ? 'success' : 'error',
                                        message: res.message,
                                    };

                                    if (res.success) {
                                        this.user[
                                            array_type === 'skills'
                                                ? 'skill'
                                                : array_type
                                        ].splice(index, 0);
                                        this.user_service.user = this.user;
                                    }
                                },
                                error: (error: any) =>
                                    this.showErrorMessage(error),
                            });
                        }
                    },
                });
            } else {
                this.removeRow(array_type, index);
            }
        }
    }

    /**
     * to show common error message
     */
    showErrorMessage(error: any) {
        console.log(error);
        this.show_alert = true;
        this.alert = {
            type: 'error',
            message:
                'Your request cannot be processed at this time. Please try again later.',
        };
    }

    /**
     * to get country name
     *
     * @returns
     */
    getCountryName(): string {
        return (
            this.shared_service.countries.find(
                (x) => x.country_id === this.getFormValue.country_id
            )?.country_name
        );
    }

    /**
     * to get gender description
     * 
     * @returns 
     */
    getGenderDescription(): string {
        return (
            this.shared_service.genders.find(
                (x) => x.gender_id === this.getFormValue.gender_id
            )?.description
        );
    }
}
