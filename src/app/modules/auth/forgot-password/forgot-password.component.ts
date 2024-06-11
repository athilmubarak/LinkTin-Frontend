/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    NgForm,
    Validators,
} from '@angular/forms';
import { finalize } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { CommonResponse } from 'app/models/common-response.types';
import { FuseValidators } from '@fuse/validators';
import { Router } from '@angular/router';

@Component({
    selector: 'auth-forgot-password',
    templateUrl: './forgot-password.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthForgotPasswordComponent implements OnInit {
    //Variables
    @ViewChild('forgotPasswordNgForm') forgotPasswordNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    showAlert: boolean = false;
    show_reset_form: boolean = false;

    //FormGroup
    forgotPasswordForm: FormGroup;
    reset_password_form: FormGroup;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private router: Router
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
        });

        this.reset_password_form = this._formBuilder.group(
            {
                user_id: new FormControl('', Validators.required),
                otp: new FormControl('', Validators.required),
                password: new FormControl('', Validators.required),
                confirm_password: new FormControl('', Validators.required),
            },
            {
                validators: FuseValidators.mustMatch(
                    'password',
                    'confirm_password'
                ),
            }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Send the reset link
     */
    sendResetLink(): void {
        // Return if the form is invalid
        if (this.forgotPasswordForm.invalid) {
            return;
        }

        // Disable the form
        this.forgotPasswordForm.disable();

        // Hide the alert
        this.showAlert = false;

        this._authService
            .sendResetOTP({ mail: this.forgotPasswordForm.get('email').value })
            .subscribe({
                next: (res: CommonResponse<{ user_id: number }>) => {
                    console.log(res);

                    this.showAlert = true;
                    if (res.success) {
                        this.alert = {
                            type: 'success',
                            message: `Password reset sent! You'll receive an email in the entered mail id.`,
                        };

                        this.reset_password_form.patchValue({
                            user_id: res.data.user_id,
                        });
                        this.show_reset_form = true;
                    } else {
                        this.alert = {
                            type: 'error',
                            message:
                                'Email does not found! Are you sure you are already a member?',
                        };
                    }
                    setTimeout(() => (this.showAlert = false), 2000);
                },
                complete: () => this.forgotPasswordForm.enable(),
                error: () => {
                    this.showAlert = true;
                    this.alert = {
                        type: 'error',
                        message:
                            'Email does not found! Are you sure you are already a member?',
                    };

                    setTimeout(() => (this.showAlert = false), 2000);
                    this.forgotPasswordForm.enable();
                },
            });
    }

    /**
     * to reset password
     * 
     * @returns 
     */
    resetPassword(): void {
        if (this.reset_password_form.invalid) {
            return;
        }

        this.reset_password_form.disable();
        this._authService
            .resetUserPassword(this.reset_password_form.value)
            .subscribe({
                next: (res: CommonResponse<undefined>) => {
                    console.log(res);

                    this.showAlert = true;
                    this.alert = {
                        type: res.success ? 'success' : 'error',
                        message: res.message,
                    };
                    if (res.success) {
                        this.reset_password_form.reset();
                        this.show_reset_form = false;
                        this.router.navigateByUrl('/sign-in');
                    }
                    setTimeout(() => (this.showAlert = false), 2000);
                },
                complete: () => this.reset_password_form.enable(),
                error: () => {
                    this.reset_password_form.enable();
                    this.showAlert = true;
                    this.alert = {
                        type: 'error',
                        message:
                            'Your request cannot be processed. Please try again later.',
                    };

                    setTimeout(() => (this.showAlert = false), 2000);
                },
            });
    }
}
