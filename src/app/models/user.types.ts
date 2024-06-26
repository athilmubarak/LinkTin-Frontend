/* eslint-disable eol-last */
/* eslint-disable @typescript-eslint/naming-convention */
import { Attachment } from './attachment.types';
import { Certification } from './certification.types';
import { Education } from './education.types';
import { Experience } from './experience.types';
import { License } from './license.types';
import { LoginDetails } from './login-details.types';
import { OtherAccount } from './other-account.types';
import { Reference } from './reference.types';
import { Skill } from './skill.types';
import { UserDetails } from './user-details.types';

export interface User {
    login_details?: LoginDetails;
    user_details: UserDetails;
    experiences?: Experience[];
    educations?: Education[];
    skill?: Skill[];
    certifications?: Certification[];
    licenses?: License[];
    references?: Reference[];
    other_accounts: OtherAccount[];
    attachments: Attachment[];
    status?: string;
}