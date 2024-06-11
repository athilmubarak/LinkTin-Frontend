/* eslint-disable @typescript-eslint/naming-convention */
export interface HomeEmployee {
    vacancy_id: number;
    user_id: number;
    name: string;
    email: string;
    phone_number: string;
    profile_url: string;
    cover_url: string;
    job_id: number;
    job_name: string;
    resume_attachment_id: number;
    country_id: number;
    country_name: string;
    swipe_state?: 'swipe-right' | 'swipe-left' | 'inactive';
}
