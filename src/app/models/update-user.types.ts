/* eslint-disable eol-last */

import { Attachment } from './attachment.types';
import { Certification } from './certification.types';
import { Education } from './education.types';
import { Experience } from './experience.types';
import { License } from './license.types';
import { OtherAccount } from './other-account.types';
import { Reference } from './reference.types';
import { Skill } from './skill.types';
import { UserDetails } from './user-details.types';

/* eslint-disable @typescript-eslint/naming-convention */
export interface UpdateUser {
    user_type_id: number;
    user_id: number;
    user_details: UserDetails;
    experiences: Experience[];
    educations: Education[];
    skills: Skill[];
    certifications: Certification[];
    licenses: License[];
    references: Reference[];
    other_accounts: OtherAccount[];
    attachments: Attachment[];
}
