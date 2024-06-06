/* eslint-disable @typescript-eslint/naming-convention */
export interface Experience {
    id?: number;
    job_id: number;
    job_name?: string;
    position: string;
    company: string;
    location: string;
    joining_date: string;
    relieving_date: string;
    is_currently_working: number;
    display_order: number;
}
