/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-employee-view',
    templateUrl: './employee-view.component.html',
    styleUrls: ['./employee-view.component.scss'],
})
export class EmployeeViewComponent implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: {
            employee_user_id: number;
        }
    ) {}

    ngOnInit(): void {}
}
