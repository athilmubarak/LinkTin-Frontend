import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { FuseValidators } from '@fuse/validators';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthSignUpComponent implements OnInit {
    //FormGroup
    sign_up_form: FormGroup;

    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    showAlert: boolean = false;
    signUpForm: FormGroup;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private form_builder: FormBuilder,
        private _router: Router
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.signUpForm = this.form_builder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            company: [''],
            agreements: ['', Validators.requiredTrue]
        }
        );

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
        if (this.signUpForm.invalid) {
            return;
        }

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign up
        this._authService.signUp(this.signUpForm.value)
            .subscribe(
                (response) => {

                    // Navigate to the confirmation required page
                    this._router.navigateByUrl('/confirmation-required');
                },
                (response) => {

                    // Re-enable the form
                    this.signUpForm.enable();

                    // Reset the form
                    this.signUpNgForm.resetForm();

                    // Set the alert
                    this.alert = {
                        type: 'error',
                        message: 'Something went wrong, please try again.'
                    };

                    // Show the alert
                    this.showAlert = true;
                }
            );
    }
}
