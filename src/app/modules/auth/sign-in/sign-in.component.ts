/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    NgForm,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { CommonResponse } from 'app/models/common-response.types';
import { User } from 'app/models/user.types';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signInForm: FormGroup;
    show_alert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.signInForm = this._formBuilder.group({
            user_name: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void {
        // Return if the form is invalid
        if (this.signInForm.invalid) {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.show_alert = false;

        this._authService.logIn(this.signInForm.value).subscribe({
            next: (res: CommonResponse<User>) => {
                console.log(res);

                this.alert = {
                    type: res.success ? 'success' : 'error',
                    message: res.message,
                };
                this.show_alert = true;

                if (res.success) {
                    this._authService.setUserAsLoggedIn(res.data);
                    this._router.navigate(['/home']);
                }
            },
            error: () => {
                this.signInForm.enable();
                this.show_alert = true;
                this.alert = {
                    type: 'error',
                    message: 'Invalid username or password. Please try again.',
                };
            },
        });
    }
}
