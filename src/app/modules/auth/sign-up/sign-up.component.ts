import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { FuseValidators } from '@fuse/validators';
import { AuthService } from 'app/core/auth/auth.service';
import { UserType } from 'app/models/user-type.types';
import { SignUpService } from './services/sign-up.service';
import { CommonResponse } from 'app/models/common-response.types';
import { SharedService } from 'app/shared/services/shared.service';
import { User } from 'app/models/user.types';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthSignUpComponent implements OnInit {
    //FormGroup
    sign_up_form: FormGroup;

    //Variables
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    showAlert: boolean = false;
    user_types: UserType[];
    email_input = new Subject<string>();
    username_input = new Subject<string>();

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private form_builder: FormBuilder,
        private _router: Router,
        private sign_up_service: SignUpService,
        public shared_service: SharedService
    ) {
        this.email_input.pipe(debounceTime(400), distinctUntilChanged()).subscribe({
            next: (value: string) => {
                this.sign_up_service.checkForEmailExistance({ email: value }).subscribe({
                    next: (res: CommonResponse<undefined>) => {
                        if (!res.success) {
                            this.sign_up_form.get('email').setErrors({ isExist: true });
                        } else {
                            this.sign_up_form.get('email').setErrors(null);
                        }
                    }
                });
            }
        });

        this.username_input.pipe(debounceTime(400), distinctUntilChanged()).subscribe({
            next: (value: string) => {
                this.sign_up_service.checkForUserNameExistance({ user_name: value }).subscribe({
                    next: (res: CommonResponse<undefined>) => {
                        if (!res.success) {
                            this.sign_up_form.get('user_name').setErrors({ isExist: true });
                        } else {
                            this.sign_up_form.get('user_name').setErrors(null);
                        }
                    }
                });
            }
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.sign_up_form = this.form_builder.group(
            {
                user_type_id: new FormControl(1, Validators.required),
                email: new FormControl('', [Validators.required, Validators.email]),
                phone_number: new FormControl('', Validators.required),
                user_name: new FormControl('', Validators.required),
                password: new FormControl('', Validators.required),
                password_confirm: new FormControl('', Validators.required)
            },
            {
                validators: FuseValidators.mustMatch('password', 'password_confirm')
            }
        );

        this.getUserTypes();
        this.shared_service.getGenders();
        this.onChangeUserType(1);
    }

    /**
     * to get user types
     */
    getUserTypes() {
        this.user_types = [];
        this.sign_up_service.getUserTypes().subscribe({
            next: (res: CommonResponse<UserType[]>) => {
                console.log(res);

                this.user_types = res.data;
            },
            error: () => {
                this.user_types = [
                    {
                        user_type_id: 1,
                        user_type: 'Employee'
                    },
                    {
                        user_type_id: 2,
                        user_type: 'Employer'
                    }
                ];
            }
        });
    }

    /**
     * to reset form if user_type changes
     * 
     * @param user_type_id 
     */
    onChangeUserType(user_type_id: number) {
        let employee_controls: string[] = ['name', 'dob', 'gender_id'];
        let employer_controls: string[] = ['company_name', 'location'];
        if (user_type_id == 1) {
            //Employee

            employer_controls.forEach((control: string) => {
                if (this.sign_up_form.contains(control)) {
                    this.sign_up_form.removeControl(control);
                }
            });

            employee_controls.forEach((control: string) => {
                if (!this.sign_up_form.contains(control)) {
                    this.sign_up_form.addControl(control, new FormControl('', Validators.required));
                }
            });
        } else {
            //Employer

            employee_controls.forEach((control: string) => {
                if (this.sign_up_form.contains(control)) {
                    this.sign_up_form.removeControl(control);
                }
            });

            employer_controls.forEach((control: string) => {
                if (!this.sign_up_form.contains(control)) {
                    this.sign_up_form.addControl(control, new FormControl('', Validators.required));
                }
            });
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void {
        // Do nothing if the form is invalid
        if (this.sign_up_form.invalid) {
            return;
        }

        // Disable the form
        this.sign_up_form.disable();

        // Hide the alert
        this.showAlert = false;

        this.sign_up_service.signUpUser(this.sign_up_form.value).subscribe({
            next: (res: CommonResponse<User>) => {
                console.log(res);

                this.alert = {
                    type: res.success ? 'success' : 'error',
                    message: res.message
                };

                if (res.success) {
                    //Do the login
                    this.sign_up_form.reset();
                }
            },
            complete: () => this.sign_up_form.enable(),
            error: () => this.sign_up_form.enable()
        });
    }

    /**
     * To check whether the entered email already exist or not
     * 
     * @param email 
     * @returns 
     */
    checkEmail(email: string) {
        if (this.sign_up_form.get('email').invalid) {
            return;
        }

        this.email_input.next(email);
    }

    /**
     * To check whether the entered user_name already exist or not
     * 
     * @param user_name 
     * @returns 
     */
    checkUserName(user_name: string) {
        if (this.sign_up_form.get('user_name').invalid) {
            return;
        }

        this.username_input.next(user_name);
    }
}
