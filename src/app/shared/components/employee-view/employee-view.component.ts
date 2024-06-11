/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonResponse } from 'app/models/common-response.types';
import { User } from 'app/models/user.types';
import { SharedService } from 'app/shared/services/shared.service';

@Component({
    selector: 'app-employee-view',
    templateUrl: './employee-view.component.html',
    styleUrls: ['./employee-view.component.scss'],
})
export class EmployeeViewComponent implements OnInit {
    //Variable
    user: User;

    constructor(
        private shared_service: SharedService,
        @Inject(MAT_DIALOG_DATA)
        public data: {
            employee_user_id: number;
        }
    ) {}

    ngOnInit(): void {
        if (
            this.data &&
            this.data.employee_user_id &&
            this.data.employee_user_id > 0
        ) {
            this.shared_service
                .getEmployeeDetails(this.data.employee_user_id)
                .subscribe({
                    next: (res: CommonResponse<User>) => {
                        console.log(res);

                        this.user = res.data;
                    },
                });
        }
    }
}
