/* eslint-disable eol-last */
/* eslint-disable @typescript-eslint/naming-convention */
import { ComponentType } from '@angular/cdk/portal';
import { ArrayTypes } from 'app/modules/employee/constants/my-account-details.const';

export interface MyAccountDetail {
    array_type: ArrayTypes;
    component: ComponentType<any>;
    key: string;
    width: string;
}
