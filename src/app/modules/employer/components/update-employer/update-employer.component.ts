/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MyAccountService } from '../../services/my-account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'app/models/user.types';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-update-employer',
    templateUrl: './update-employer.component.html',
    styleUrls: ['./update-employer.component.scss'],
})
export class UpdateEmployerComponent implements OnInit {
    //FormGroup
    employer_form: FormGroup;

    //Variables

    constructor(
        private form_builder: FormBuilder,
        private my_account_service: MyAccountService,
        private snack_bar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: User
    ) {
      // this.employer_form = this.form_builder.group({

      // });
    }

    ngOnInit(): void {}
}
