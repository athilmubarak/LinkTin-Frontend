/* eslint-disable eol-last */
/* eslint-disable @typescript-eslint/naming-convention */
export interface SyncRegister {
    vacancy_id: number;
    status: number;
    approved_user_id: number;
    resume_attachment_id: number;
    other_vacancy_ids?: number[];
    other_employees?: OtherEmployee[];
}

export interface OtherEmployee {
    vacancy_id: number;
    personal_info_id: number;
}