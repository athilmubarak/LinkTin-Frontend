import { Attachment } from "./attachment.types";
import { Certification } from "./certification.types";
import { Education } from "./education.types";
import { Experience } from "./experience.types";
import { Licence } from "./licence.types";
import { LoginDetails } from "./login-details.types";
import { OtherAccount } from "./other-account.types";
import { Reference } from "./reference.types";
import { Skill } from "./skill.types";
import { UserDetils } from "./user-details.types";

export interface User {
    login_details?: LoginDetails;
    user_detials: UserDetils;
    experiences?: Experience[];
    educations?: Education[];
    skills?: Skill[];
    certifications?: Certification[];
    licenses?: Licence[];
    references?: Reference[];
    other_accounts: OtherAccount[];
    attachments: Attachment[];
}