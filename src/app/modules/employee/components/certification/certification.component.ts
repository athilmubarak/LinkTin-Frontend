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
}
