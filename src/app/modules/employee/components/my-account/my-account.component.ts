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
import { Subject, takeUntil } from 'rxjs';
import { EmployeeService } from '../../services/employee.service';
import { EducationType } from 'app/models/education-type.types';
import { CommonResponse } from 'app/models/common-response.types';
import { Job } from 'app/models/job.types';
import { AccountType } from 'app/models/account-type.types';

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

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private user_service: UserService,
        private change_detector_ref: ChangeDetectorRef,
        private form_builder: FormBuilder,
        public shared_service: SharedService,
        private employee_service: EmployeeService
    ) {
        this.shared_service.getGenders();
        this.shared_service.getJobs();
        this.shared_service.getSkills();
        this.shared_service.getAccountTypes();
    }

    ngOnInit(): void {
        this.is_edit = false;
        this.employee_form = this.form_builder.group({
            gender: new FormControl('', Validators.required),
            country: new FormControl('', Validators.required),
            name: new FormControl('', Validators.required),
            employee_phone_number: new FormControl('', Validators.required),
            employee_email: new FormControl('', [
                Validators.required,
                Validators.email,
            ]),
            dob: new FormControl('', Validators.required),
            profile_url: new FormControl(''),
            cover_url: new FormControl(''),
            portfolio: new FormControl(''),
            employee_about_us: new FormControl('', Validators.required),
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
            gender: {
                gender_id: user.user_details.gender_id,
                description: user.user_details.description,
            },
            country: {
                country_id: user.user_details.country_id,
                country_name: user.user_details.country_name,
                country_code: user.user_details.country_code,
            },
            name: user.user_details.name,
            phone_number: user.user_details.employee_phone_number,
            email: user.user_details.employee_email,
            dob: user.user_details.dob,
            profile_url: user.user_details.profile_url,
            cover_url: user.user_details.employee_cover_url,
            portfolio: user.user_details.portfolio,
            about_us: user.user_details.employee_about_us,
        });

        if (user.attachments.length > 0) {
            //attachments
            user.attachments.forEach((attachment: Attachment) => {
                this.addRow(
                    'attachments',
                    this.returnFormGroup('attachments', attachment)
                );
            });
        }

        if (user.certifications.length > 0) {
            //certifications
            user.certifications.forEach((certification: Certification) => {
                this.addRow(
                    'certifications',
                    this.returnFormGroup('certifications', certification)
                );
            });
        }

        if (user.educations.length > 0) {
            //educations
            user.educations.forEach((education: Education) => {
                this.addRow(
                    'educations',
                    this.returnFormGroup('educations', education)
                );
            });
        }

        if (user.experiences.length > 0) {
            //experiences
            user.experiences.forEach((experience: Experience) => {
                this.addRow(
                    'experiences',
                    this.returnFormGroup('experiences', experience)
                );
            });
        }

        if (user.licenses.length > 0) {
            //licenses
            user.licenses.forEach((license: License) => {
                this.addRow(
                    'licenses',
                    this.returnFormGroup('licenses', license)
                );
            });
        }

        if (user.other_accounts.length > 0) {
            //other_accounts
            user.other_accounts.forEach((other_account: OtherAccount) => {
                this.addRow(
                    'other_accounts',
                    this.returnFormGroup('other_accounts', other_account)
                );
            });
        }

        if (user.references.length > 0) {
            //references
            user.references.forEach((reference: Reference) => {
                this.addRow(
                    'references',
                    this.returnFormGroup('references', reference)
                );
            });
        }

        if (user.skills.length > 0) {
            //skills
            user.skills.forEach((skill: Skill) => {
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
}
