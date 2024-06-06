/* eslint-disable @typescript-eslint/naming-convention */
import { MyAccountDetail } from 'app/models/my-account-detail.type';
import { ExperienceComponent } from '../components/experience/experience.component';
import { EducationComponent } from '../components/education/education.component';
import { CertificationComponent } from '../components/certification/certification.component';
import { OtherAccountComponent } from 'app/shared/components/other-account/other-account.component';

/* eslint-disable eol-last */
export type ArrayTypes =
    | 'attachments'
    | 'certifications'
    | 'educations'
    | 'experiences'
    | 'licenses'
    | 'other_accounts'
    | 'references'
    | 'skills';

export const MY_ACCOUNT_DETAILS: MyAccountDetail[] = [
    {
        array_type: 'experiences',
        component: ExperienceComponent,
        key: 'experience',
        width: '500px',
    },
    {
        array_type: 'educations',
        component: EducationComponent,
        key: 'education',
        width: '400px',
    },
    {
        array_type: 'certifications',
        component: CertificationComponent,
        key: 'certification',
        width: '400px',
    },
    {
        array_type: 'other_accounts',
        component: OtherAccountComponent,
        key: 'other_account',
        width: '400px',
    }
];
