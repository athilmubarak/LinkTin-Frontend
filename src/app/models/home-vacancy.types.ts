/* eslint-disable @typescript-eslint/naming-convention */
export interface HomeVacancy {
    vacancy_id: number;
    job_id: number;
    Job_Name: string;
    employment_type_id: number;
    placement_type: string;
    location: string;
    salary_range: string;
    user_id: number;
    company_name: string;
    location1: string;
    company_logo: string;
    swipe_state?: 'swipe-right' | 'swipe-left' | 'inactive';
}
